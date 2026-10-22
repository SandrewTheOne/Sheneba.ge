"""Additional checks for filtering, sorting, plans, company records and accessibility."""
from playwright.sync_api import sync_playwright, expect
import re
from pathlib import Path
out=Path(__file__).resolve().parents[1]/'validation'
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'])
 page=b.new_page(viewport={'width':1440,'height':1000})
 errors=[];bad_images=[]
 page.on('pageerror',lambda e:errors.append(str(e)))
 page.goto('http://127.0.0.1:3000/',wait_until='networkidle')
 page.get_by_role('button',name='ენის შეცვლა').click()
 page.goto('http://127.0.0.1:3000/search?budget=10-15&type=house&location=tbilisi',wait_until='networkidle')
 expect(page.get_by_role('heading',name='Found 3 professionals')).to_be_visible()
 assert page.locator('.professional-card').count()==3
 page.goto('http://127.0.0.1:3000/search?sort=price',wait_until='networkidle')
 prices=[float(re.search(r'\$(\d+)',v).group(1)) for v in page.locator('.card-price').all_text_contents()]
 assert prices==sorted(prices)
 page.get_by_role('button',name='Next',exact=True).click()
 expect(page.locator('.pagination button[aria-current=page]')).to_have_text('2')
 assert page.locator('.professional-card').count()==6
 page.get_by_role('button',name='List view').click()
 expect(page.locator('.list-results')).to_be_visible()
 page.goto('http://127.0.0.1:3000/search?q=nonexistent',wait_until='networkidle')
 expect(page.get_by_role('heading',name='No professionals found')).to_be_visible()
 page.goto('http://127.0.0.1:3000/company/delta',wait_until='networkidle')
 expect(page.get_by_role('heading',name='Leadership & team')).to_be_visible()
 assert page.locator('.team-grid article').count()==3
 assert page.locator('.partner-row article').count()==3
 assert len(set(page.locator('.portfolio-item img').evaluate_all('(imgs)=>imgs.map(i=>i.getAttribute("src"))')))==6
 page.locator('.education-card').first.click()
 expect(page.get_by_role('dialog')).to_be_visible()
 page.keyboard.press('Escape')
 with page.expect_download() as download:
  page.get_by_role('button',name='Save contact').click()
 assert download.value.suggested_filename=='delta.vcf'
 page.goto('http://127.0.0.1:3000/pricing',wait_until='networkidle')
 page.get_by_role('button',name='Choose PRO',exact=True).click()
 expect(page.get_by_text('Selected plan: PRO. Payments are not enabled in this demo.')).to_be_visible()
 page.keyboard.press('Escape')
 page.get_by_role('button',name='Log in',exact=True).click()
 page.get_by_role('dialog').get_by_label('Email').fill('demo@example.com')
 page.get_by_label('Password',exact=True).fill('demo-pass')
 page.get_by_role('button',name='Continue',exact=True).click()
 expect(page.get_by_text('Demo form completed. No real account was created.')).to_be_visible()
 page.keyboard.press('Escape')
 for url in ['/','/search','/professional/nino','/company/malxazzi','/projects','/pricing']:
  page.goto('http://127.0.0.1:3000'+url,wait_until='networkidle')
  bad_images+=page.locator('img').evaluate_all('(imgs)=>imgs.filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.src)')
  for width in [320,768,1440]:
   page.set_viewport_size({'width':width,'height':900})
   assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'),(url,width)
  print('PASS route/images/responsive',url)
 page.goto('http://127.0.0.1:3000/search',wait_until='networkidle')
 page.screenshot(path=str(out/'search-desktop-final.png'),full_page=True)
 page.goto('http://127.0.0.1:3000/professional/malxazzi',wait_until='networkidle')
 page.screenshot(path=str(out/'specialist-desktop-final.png'),full_page=True)
 response=page.goto('http://127.0.0.1:3000/professional/no-such-id',wait_until='networkidle')
 assert response.status==404
 assert not errors,errors
 assert not bad_images,bad_images
 b.close()
print('PASS: budget/location/type filters, sort, pagination, list view, empty state, company team/partners, unique portfolio assets, certificates, vCard, plans, login demo, all routes, image loading, 320/768/1440 layouts and 404')
