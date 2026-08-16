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
    }

    // Caso 1: Proceso de Registro
    async registrarCliente(datosRegistro: any) {
        // 1. Validar Localizador label: Regístrate
        const labelRegistrate = this.page.locator('text=Regístrate').first();
        await expect(labelRegistrate).toBeVisible();

        // 2. Localizador que inicia el registro
        const botonRegistro = this.page.locator('id=show_register');
        await botonRegistro.click();

        // 3. Llenar el formulario con los datos del Excel (con validaciones)
        await this.llenarCampoSiValido('id=reg_username', datosRegistro.cedula);
        await this.llenarCampoSiValido('[id="first_name"]', datosRegistro.first_name); 
        await this.llenarCampoSiValido('[id="last_name"]', datosRegistro.last_name);
        await this.llenarCampoSiValido('id=reg_email', datosRegistro.reg_email);
        await this.llenarCampoSiValido('id=reg_password', datosRegistro.reg_password);
        await this.llenarCampoSiValido('id=reg_password2', datosRegistro.reg_password2);
        
        // 4. Localizador que autoriza la política de privacidad
        const botonAutorizo = this.page.locator('id=privacy_policy_reg');
        await botonAutorizo.click()
        // 5. Localizador que confirma el registro
        const botonRegistrarme = this.page.locator('id=form-register');
        await botonRegistrarme.click();

        await this.page.waitForTimeout(5000);
        // 6. Capturar evidencia tras finalizar el proceso
        await this.page.screenshot({ path: 'evidencias/1_registro_exitoso.png', fullPage: true });
    }

    // Caso 2: Proceso de Inicio de Sesión
    async iniciarSesion(datosLogin: any) {
        // 1. Validar Localizador label: Inicia sesión
        const labelIniciaSesion = this.page.locator('text=Inicia sesión').first();
        await expect(labelIniciaSesion).toBeVisible();

        // 2. Llenar el formulario con los datos del Excel (con validaciones)
        await this.llenarCampoSiValido('id=username', datosLogin.cedula);
        await this.llenarCampoSiValido('id=password', datosLogin.password);

        // 3. Localizador que inicia la sesión
        //const botonIniciaSesion = this.page.getByRole('button', { name: 'login' });
        const botonIniciaSesion = this.page.locator('button[name="login"]');
        await botonIniciaSesion.click();

        // 4. Capturar evidencia tras finalizar el proceso
        await this.page.screenshot({ path: 'evidencias/2_login_exitoso.png', fullPage: true });
    }
}