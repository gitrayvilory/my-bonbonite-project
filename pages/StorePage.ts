import { Page, expect } from '@playwright/test';

export class StorePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Método auxiliar para validar nulos/vacíos antes de escribir
    private async llenarCampoSiValido(localizador: string, valor: any) {
        if (valor !== null && valor !== undefined && valor.toString().trim() !== '') {
            await this.page.locator(localizador).fill(valor.toString());
        } else {
            console.log(`Dato omitido: El valor para ${localizador} está vacío o nulo en el Excel.`);
        }
    }

    // Caso 3: Comprar Zapatos
    async irAComprarZapatos(datosZapatos: any) {
        // 1. Navegar a la página principal
        await this.page.goto('https://www.bon-bonite.com/categoria-producto/zapatos-mujer/');

        const busquedaProd = this.page.locator('id=search-btn');
        await busquedaProd.click();

        // 2. Llenar el buscador con el dato del Excel (con validación)
        await this.llenarCampoSiValido('id=s', datosZapatos.desc_producto);

        const busquedaProdsubmit = this.page.locator('id=searchsubmit');
        await busquedaProdsubmit.click();

        // 3. Validar Localizador label: Zapatos
        const labelZapatos = this.page.locator('text=Zapatos').first();
        await expect(labelZapatos).toBeVisible();

        // 4. Localizador que inicia comprar zapatos
        const imgZapatos = this.page.locator("img[src*='mocasin-en-cuero-miel-199052-A-600x600.png']");
        await imgZapatos.click();
        
        const imgTallaZapatos = this.page.locator('button[data-value="34"]');
        await imgTallaZapatos.click();

        const ComprarZapatos = this.page.getByRole('link', { name: 'Comprar Ahora' });
        await ComprarZapatos.click();

        const FinalizarCompra = this.page.getByRole('link', { name: 'Finalizar compra' });
        await FinalizarCompra.click();

        // 5. Capturar evidencia tras finalizar el proceso
        await this.page.screenshot({ path: 'evidencias/3_zapatos_exitosos.png', fullPage: true });
    }
}