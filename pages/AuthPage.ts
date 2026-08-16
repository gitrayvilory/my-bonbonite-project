import { Page, expect } from '@playwright/test';

export class AuthPage {
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

    // Navegar a la página de Mi Cuenta
    async irAMiCuenta() {
        await this.page.goto('https://www.bon-bonite.com/mi-cuenta/');

            // Validar cookiescript de forma segura
    const cookiescript = this.page.locator('id=cookiescript_accept');

        // Comprobamos si el botón de cookies está presente y visible antes de hacer clic
        if (await cookiescript.isVisible()) {
            await cookiescript.click();
            console.log("Banner de cookies aceptado exitosamente.");
        } else {
            console.log("El banner de cookies no está presente en esta vista.");
        }
    }

    // Caso 1: Proceso de Registro
    async registrarCliente(datosRegistro: any) {
        // Validar Localizador label: Regístrate
        const labelRegistrate = this.page.locator('text=Regístrate').first();
        await expect(labelRegistrate).toBeVisible();

        // Localizador que inicia el registro
        const botonRegistro = this.page.locator('id=show_register');
        await botonRegistro.click();

        // Llenar el formulario con los datos del Excel (con validaciones)
        await this.llenarCampoSiValido('id=reg_username', datosRegistro.cedula);
        await this.llenarCampoSiValido('[id="first_name"]', datosRegistro.first_name); 
        await this.llenarCampoSiValido('[id="last_name"]', datosRegistro.last_name);
        await this.llenarCampoSiValido('id=reg_email', datosRegistro.reg_email);
        await this.llenarCampoSiValido('id=reg_password', datosRegistro.reg_password);
        await this.llenarCampoSiValido('id=reg_password2', datosRegistro.reg_password2);
        
        // Localizador que autoriza la política de privacidad
        const botonAutorizo = this.page.locator('id=privacy_policy_reg');
        await botonAutorizo.click()
        // Localizador que confirma el registro
        const botonRegistrarme = this.page.locator('id=form-register');
        await botonRegistrarme.click();

        await this.page.waitForTimeout(5000);
        // Capturar evidencia tras finalizar el proceso
        await this.page.screenshot({ path: 'evidencias/1_registro_exitoso.png', fullPage: true });
    }

    // Caso 2: Proceso de Inicio de Sesión
    async iniciarSesion(datosLogin: any) {
        // Validar Localizador label: Inicia sesión
        const labelIniciaSesion = this.page.locator('text=Inicia sesión').first();
        await expect(labelIniciaSesion).toBeVisible();

        // Llenar el formulario con los datos del Excel (con validaciones)
        await this.llenarCampoSiValido('id=username', datosLogin.cedula);
        await this.llenarCampoSiValido('id=password', datosLogin.password);

        // Localizador que inicia la sesión
        //const botonIniciaSesion = this.page.getByRole('button', { name: 'login' });
        const botonIniciaSesion = this.page.locator('button[name="login"]');
        await botonIniciaSesion.click();

        // Capturar evidencia tras finalizar el proceso
        await this.page.screenshot({ path: 'evidencias/2_login_exitoso.png', fullPage: true });
    }
}