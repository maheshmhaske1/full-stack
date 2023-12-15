var express = require('express');
var router = express.Router();
const multer = require('multer');
var { verifyAdmin } = require('../middleware/Auth')
var admin = require('../controller/admin.controller');


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// ============ product apis =========== //
router.post('/product/add', verifyAdmin, upload.array('images', 4), admin.addProduct)
router.get('/product/get-all', verifyAdmin, admin.getAllProducts)
router.post('/product/get-byId', verifyAdmin, admin.getProductsById)
router.get('/product/get-byCategory', verifyAdmin, admin.getProductsByCategory)
router.put('/product/update/:productId', upload.array('files', 4), admin.updateProduct)
router.delete('/product/delete/:productId', verifyAdmin, admin.deleteProduct)
router.put('/product/deleteImage', verifyAdmin, admin.deleteProductImage)
router.post('/product/uploadImages/:productId/:folderName', admin.uploadImages)
router.post('/product/uploadfolder', admin.uploadFolder)

// ============ category apis =========== //
router.post('/category/add', verifyAdmin, admin.addCategory)
router.put('/category/update/:categoryId', verifyAdmin, admin.updateCategory)
router.delete('/category/delete/:categoryId', verifyAdmin, admin.deleteCategory)
router.get('/category/get-all', verifyAdmin, admin.getAllCategories)

// ============= user apis ============= //
router.get('/user/get-all', verifyAdmin, admin.getAllUsers)
router.put('/user/change-status/:userId', verifyAdmin, admin.userBanUnban)

// ============= FAQ apis ============= //
router.post('/faq/add', verifyAdmin, admin.createFaq)
router.get('/faq/get-all', verifyAdmin, admin.getAllFaqs)
router.put('/faq/update/:faqId', verifyAdmin, admin.updatefaq)


module.exports = router;
