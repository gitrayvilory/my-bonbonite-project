import { test } from '@playwright/test';
import { AuthPage } from '../pages/AuthPage';
import { StorePage } from '../pages/StorePage';
import { leerExcel } from '../utils/excelReader';

// Leemos los datos desde el archivo Excel
const datosRegistro = leerExcel('datos_bonbonite.xlsx', 'Registro')[0];
const datosLogin = leerExcel('datos_bonbonite.xlsx', 'Login')[0];
const datosZapatos = leerExcel('datos_bonbonite.xlsx', 'Zapatos')[0];

test.describe('Suite de Pruebas Secuenciales: Bon-Bonite', () => {

    test('Ejecutar Registro, Login y compra', async ({ page }) => {
        const authPage = new AuthPage(page);
        const storePage = new StorePage(page);

        // --- CASO 1: Registro Cliente ---
        console.log('Iniciando Caso 1: Registro...');
        await authPage.irAMiCuenta();
        await authPage.registrarCliente(datosRegistro);

        // --- CASO 2: Iniciar Sesión ---
        console.log('Iniciando Caso 2: Inicio de Sesión...');
        await authPage.irAMiCuenta(); // O navegas directamente si ya estás ahí
        await authPage.iniciarSesion(datosLogin);

        // --- CASO 3: Comprar Zapatos ---
        console.log('Iniciando Caso 3: Búsqueda de Zapatos...');
        await storePage.irAComprarZapatos(datosZapatos);

        console.log('¡Todos los casos se ejecutaron secuencialmente sin cerrar el navegador!');
    });

});