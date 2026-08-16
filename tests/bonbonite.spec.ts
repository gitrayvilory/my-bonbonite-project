import { test } from '@playwright/test';
import { AuthPage } from '../pages/AuthPage';
import { StorePage } from '../pages/StorePage';
import { leerExcel } from '../utils/excelReader';

// Asegúrate de crear este archivo en la carpeta "datos"
const datosRegistro = leerExcel('datos_bonbonite.xlsx', 'Registro')[0];
const datosLogin = leerExcel('datos_bonbonite.xlsx', 'Login')[0];
const datosZapatos = leerExcel('datos_bonbonite.xlsx', 'Zapatos')[0];

test.describe('Suite de Pruebas: Bon-Bonite', () => {

    test('Caso 1: Registro Cliente', async ({ page }) => {
        const authPage = new AuthPage(page);
        await authPage.irAMiCuenta();
        await authPage.registrarCliente(datosRegistro);
    });

    test('Caso 2: Iniciar Sesión', async ({ page }) => {
        const authPage = new AuthPage(page);
        await authPage.irAMiCuenta();
        await authPage.iniciarSesion(datosLogin);
    });

    test('Caso 3: Comprar Zapatos', async ({ page }) => {
        const storePage = new StorePage(page);
        await storePage.irAComprarZapatos(datosZapatos);
    });


    

});