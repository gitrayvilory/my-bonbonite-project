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
    async irAComprarZapatos(datosProducto: any) {
        // 1. Navegar a la página principal
        await this.page.goto('https://www.bon-bonite.com/categoria-producto/zapatos-mujer/');

        const busquedaProd = this.page.locator('id=search-btn');
        await busquedaProd.click();

        // Llenar el buscador con el dato del Excel (con validación)
        await this.llenarCampoSiValido('id=s', datosProducto.desc_producto);

        const busquedaProdsubmit = this.page.locator('id=searchsubmit');
        await busquedaProdsubmit.click();

        // Validar Localizador label: Producto encontrado
        const labelProducto = this.page.locator(`text=${datosProducto.producto}`).first();
        await expect(labelProducto).toBeVisible();

        // Localizador que inicia comprar zapatos
        //const imgProducto = this.page.locator(`img[src*='${datosProducto.img_producto}']`);
        const imgProducto = this.page.locator('id=image-1026396').first();
        await imgProducto.click();
        
        const tallaProducto = this.page.locator(`button[data-value="${datosProducto.talla_producto}"]`);
        await tallaProducto.click();

        const ComprarProducto = this.page.getByRole('link', { name: 'Comprar Ahora' });
        await ComprarProducto.click();
        
        await this.page.waitForTimeout(3000);
        const finalizarCompra = this.page.getByRole('link', { name: 'Finalizar compra' });
        await finalizarCompra.click();

        await this.page.waitForTimeout(3000);
        const continuarCompra = this.page.getByRole('link', { name: 'Continuar' });
        await continuarCompra.click();

        // Capturar evidencia tras finalizar el proceso
        await this.page.screenshot({ path: 'evidencias/3_compra_exitosa.png', fullPage: true });
    }
}