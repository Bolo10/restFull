// =============================================
// Puerto
// =============================================

process.env.PORT = process.env.PORT || 3000;

// =============================================
// Entorno
// =============================================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// =============================================
// Vencimiento del Token
// =============================================
// 60 segundos
// 60 minutos
// 24 horas
// 30 días
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// =============================================
// SEED de Autenticación
// =============================================
process.env.SEED = process.env.SEED || 'seed-desarrollo';

// =============================================
// Base de datos
// =============================================

let urlDB;
let user = 'adminCafe';
let password = 'cafeadmin123';
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe'

} else {
    // urlDB = `mongodb+srv://${user}:${password}@cafe.xcifs.mongodb.net/test`
    urlDB = 'mongodb+srv://cafeAdmin:admincafe123@cafe.xcifs.mongodb.net/test'

}
process.env.URLDB = urlDB;