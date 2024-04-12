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
    // UF
    await (await page).select("select#uf", "df");
    // county
    await (await page).select("select#municipio", "8770");
    // subscription
    (await page).select("select#inscricao", "P");
    // situation type
    (await page).select("select#tipoSituacao", "A");
    // situation
    (await page).select("select#situacao", "A");
    // specialty
    await (await page).select("select#especialidade", "95");
  } catch (e) {
    console.log(e);
  }
}

async function main(doctarData: DoctorData) {
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

const robot = async () => {
  const doctarData: DoctorData = {
    name: "Danillo Ferreira Araujo",
    crm: 1234567,
    uf: "SE",
    county: "Aracaju",
  };

  await main(doctarData);
};

robot();
