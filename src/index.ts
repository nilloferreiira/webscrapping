import puppeteer, { Page } from "puppeteer";

async function fillData(page: Promise<Page>) {
   
    try{
        const nameInput = await (await page).waitForSelector('input[name="nome"]');
        
        if (nameInput) {
            await nameInput.focus();
            await (await page).keyboard.type('Danillo');
          } else {
            console.error('Input element with name="nome" not found.');
          }
      
       
    } catch(e) {
        console.log(e)
    }

}

async function main() {
    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = browser.newPage();
        const URL = 'https://portal.cfm.org.br/busca-medicos/';
        (await page).setViewport({
            width: 1365, height: 965,
            deviceScaleFactor: 1,
        });
        (await page).goto(URL);
        
        
       await fillData(page)

    } catch(e) {
        console.log(e);
    }
}

let robot = async () => {
    await main();
}

robot();

