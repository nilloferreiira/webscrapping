import puppeteer, { Page } from "puppeteer";

interface DoctorData {
  name: string;
  uf: string;
  crm: number;
  county: string;
  // adicionar o resto
}

async function fillData(page: Promise<Page>, doctorData: DoctorData) {
  try {
    // text inputs
    const nameInput = await (await page).waitForSelector('input[name="nome"]');
    if (nameInput) {
      await nameInput.focus();
      await (await page).keyboard.type(doctorData.name);
    } else {
      console.error('Input element with name="nome" not found.');
    }

    const crmInput = await (await page).waitForSelector('input[name="crm"]');
    if (crmInput) {
      await crmInput.focus();
      await (await page).keyboard.type(String(doctorData.crm));
    } else {
      console.error('Input element with name="crm" not found.');
    }

    // select inputs
    // const ufInput = await (await page).waitForSelector('select[name="uf"]');
    // if (ufInput) {
    //   const options = await ufInput.evaluate((el) => {
    //     return Array.from(el.options).map((option: any) => option.value);
    //   });
    //   console.log(options);
    //   await ufInput.select(doctorData.uf);
    // }


  } catch (e) {
    console.log(e);
  }
}

async function main() {
  const doctarData: DoctorData = {
    name: "Danillo Ferreira Araujo",
    crm: 1234567,
    uf: "SE",
    county: "Aracaju",
  };

  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = browser.newPage();
    const URL = "https://portal.cfm.org.br/busca-medicos/";

    // apagar esta linha
    (await page).setViewport({
      width: 1365,
      height: 965,
      deviceScaleFactor: 1,
    });
    //

    (await page).goto(URL);

    await fillData(page, doctarData);
  } catch (e) {
    console.log(e);
  }
}

let robot = async () => {
  await main();
};

robot();
