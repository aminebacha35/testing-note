import { firefox } from 'playwright';
describe('AddNoteForm', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await firefox.launch({ headless: false }); 
  });

  afterAll(async () => {
    await browser.close();
  });

  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto('http://localhost:5173'); 
  });

  afterEach(async () => {
    await page.close();
  });

  test('AddNoteForm submits the form correctly', async () => {
    await page.fill('input[placeholder="Title"]', 'Test Note');
    await page.fill('input[placeholder="Score"]', '15');
    await page.fill('textarea[placeholder="Comment"]', 'test note.');

    await page.click('button[type="submit"]');

    const successMessageElement = await page.waitForSelector('.success-message');
    expect(successMessageElement).not.toBeNull();
  
    // Vérifiez le contenu de la message de succès
    const successMessageText = await successMessageElement.innerText();
    expect(successMessageText).toBe('Note added successfully');
  
    // Vérifiez que le formulaire est réinitialisé
    const titleInputValue = await page.$eval('input[placeholder="Title"]', (input) => input.value);
    const scoreInputValue = await page.$eval('input[placeholder="Score"]', (input) => input.value);
    const commentInputValue = await page.$eval('textarea[placeholder="Comment"]', (textarea) => textarea.value);
  
    expect(titleInputValue).toBe('');
    expect(scoreInputValue).toBe('');
    expect(commentInputValue).toBe('');  });
});
