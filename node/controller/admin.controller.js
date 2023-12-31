const { default: mongoose } = require('mongoose');
const cloudinary = require('cloudinary').v2;
const categories = require('../model/category.model');
const products = require('../model/product.model');
const users = require('../model/user.model');
const faqs = require('../model/faq.model');

cloudinary.config({
    cloud_name: 'dpq8jfqt7',
    api_key: '741853831973544',
    api_secret: 'XvRvuZ43m1FhGVqDZTZyjxphaCY',
});

//=============== PRODUCT APIS ==============//
exports.addProduct = async (req, res) => {
    const { productName, productDescription, price, category, totalQuantity } = req.body;


    const missingFields = ['productName', 'productDescription', 'price', 'category', 'totalQuantity']
        .filter(field => !req.body[field]);

    if (missingFields.length > 0) {
        return res.json({
            status: false,
            message: `Missing required fields: ${missingFields.join(', ')}`
        });
    }

    const isValidCategory = await categories.findById({ _id: category })
    if (!isValidCategory) {
        return res.json({
            status: false,
            message: `invalid category.`
        });
    }

    await new products(req.body)
        .save()
        .then((success) => {
            return res.json({
                status: true,
                message: `product Added`,
                data: success
            });
        })
        .catch(error => {
            return res.json({
                status: false,
                message: `something went wrong`
            });
        })
}

exports.getAllProducts = async (req, res) => {
    const { type } = req.body

    

    await products.aggregate([
        {
            $match: {
                isActive: type
            }
        },
        {
            $lookup: {
                from: "categories",
                localField: "category",
                foreignField: "_id",
                as: "category"
            }
        }
    ])
        .then(success => {
            return res.json({
                status: true,
                message: `products`,
                data: success
            });
        })
        .catch(error => {
            return res.json({
                status: false,
                message: `something went wrong`
            });
        })
}

exports.getProductsByCategory = async (req, res) => {
    const { category } = req.body;

    const missingFields = ['category']
        .filter(field => !req.body[field]);

    if (missingFields.length > 0) {
        return res.json({
            status: false,
            message: `Missing required fields: ${missingFields.join(', ')}`
        });
    }

    await products.find({ category: new mongoose.Types.ObjectId(category) })
        .then(success => {
            return res.json({
                status: true,
                message: `products`,
                data: success
            });
        })
        .catch(error => {
            return res.json({
                status: false,
                message: `something went wrong`
            });
        })
}

exports.getProductsById = async (req, res) => {
    const { productId } = req.body;

    const missingFields = ['productId']
        .filter(field => !req.body[field]);

    if (missingFields.length > 0) {
        return res.json({
            status: false,
            message: `Missing required fields: ${missingFields.join(', ')}`
        });
    }

    await products.find({ _id: new mongoose.Types.ObjectId(productId) })
        .then(success => {
            return res.json({
                status: true,
                message: `product`,
                data: success
            });
        })
        .catch(error => {
            return res.json({
                status: false,
                message: `something went wrong`
            });
        })
}

exports.updateProduct = async (req, res) => {
    const { productId } = req.params;
    const updateProduct = req.body;

    if (updateProduct.length == 0) {
        return res.json({
            status: false,
            message: `update data not be null`
        });
    }

    const isProductExists = await products.findOne({ _id: new mongoose.Types.ObjectId(productId) });
    if (!isProductExists) {
        return res.json({
            status: false,
            message: `product not found`
        });
    }
    let images = isProductExists.images;
    updateProduct.images = images;

    if (req.files) {
        const folder = `products/${isProductExists._id}`;
        const uploadedImages = [];

        req.files.forEach(async (file) => {
            cloudinary.uploader.upload_stream(
                { resource_type: 'auto', folder: folder, public_id: file.originalname },
                (error, result) => {
                    if (error) {
                        return res.json({
                            status: false,
                            message: `Error uploading to Cloudinary.`
                        })
                    }
                    uploadedImages.push(result.secure_url);
                    images.push(result.secure_url);
                    if (uploadedImages.length === req.files.length) {
                        updateProd();
                    }
                }
            ).end(file.buffer);
        });
    }
    else {
        updateProd();
    }

    function updateProd() {
        products.findByIdAndUpdate({ _id: new mongoose.Types.ObjectId(productId) },
            {
                $set: updateProduct
            })
            .then(success => {
                return res.json({
                    status: true,
                    message: `product updated`,
                    data: success
                });
            })
            .catch(error => {
                return res.json({
                    status: false,
                    message: error.message
                });
            })
    }

}

exports.deleteProductImage = async (req, res) => {
    const { productId, imageId } = req.body;
    const missingFields = ['productId', 'imageId']
        .filter(field => !req.body[field]);

    if (missingFields.length > 0) {
        return res.json({
            status: false,
            message: `Missing required fields: ${missingFields.join(', ')}`
        });
    }

    const isProductExists = await products.findOne({ _id: new mongoose.Types.ObjectId(productId) });
    if (!isProductExists) {
        return res.json({
            status: false,
            message: `product not found`
        });
    }

    if (!isProductExists.images.includes(imageId)) {
        return res.json({
            status: false,
            message: `image not found`
        });
    }

    await products.updateMany(
        { _id: new mongoose.Types.ObjectId(productId) },
        {
            $pull: { images: imageId }
        })
        .then(success => {
            return res.json({
                status: true,
                message: `image deleted`,
                data: success
            });
        })
        .catch(error => {
            return res.json({
                status: false,
                message: `something went wrong`
            });
        })
}

exports.deleteProduct = async (req, res) => {
    const { productId } = req.params;

    await products.findOneAndUpdate({ _id: productId }, {
        $set: { isActive: false }
    })
        .then(success => {
            return res.json({
                status: true,
                message: `product deleted`,
                data: success
            });
        })
        .catch(error => {
            return res.json({
                status: false,
                message: `something went wrong`
            });
        })
}


//=============== CATEGORY APIS ==============//
exports.addCategory = async (req, res) => {
    const { categoryName } = req.body;

    const missingFields = ['categoryName']
        .filter(field => !req.body[field]);

    if (missingFields.length > 0) {
        return res.json({
            status: false,
            message: `Missing required fields: ${missingFields.join(', ')}`
        });
    }

    await new categories(req.body)
        .save()
        .then(success => {
            return res.json({
                status: true,
                message: `category Added`,
                data: success
            });
        })
        .catch(error => {
            return res.json({
                status: false,
                message: `something went wrong`
            });
        })
}

exports.updateCategory = async (req, res) => {
    const { categoryId } = req.params;
    const { categoryName } = req.body;

    const missingFields = ['categoryName']
        .filter(field => !req.body[field]);

    if (missingFields.length > 0) {
        return res.json({
            status: false,
            message: `Missing required fields: ${missingFields.join(', ')}`
        });
    }

    await categories.findByIdAndUpdate({ _id: categoryId },
        {
            $set: { categoryName }
        })
        .then(success => {
            return res.json({
                status: true,
                message: `category updated`,
                data: success
            });
        })
        .catch(error => {
            return res.json({
                status: false,
                message: `something went wrong`
            });
        })
}

exports.deleteCategory = async (req, res) => {
    const { categoryId } = req.params;

    const isProductExistWithCat = await products.find({ category: new mongoose.Types.ObjectId(categoryId) })
    if (isProductExistWithCat.length > 0) {
        return res.json({
            status: false,
            message: `cant able to delete some products associates with this category`
        });
    }

    await categories.findByIdAndDelete({ _id: categoryId })
        .then(success => {
            return res.json({
                status: true,
                message: `category deleted`,
                data: success
            });
        })
        .catch(error => {
            return res.json({
                status: false,
                message: `something went wrong`
            });
        })
}

exports.getAllCategories = async (req, res) => {
    await categories.find()
        .then(success => {
            return res.json({
                status: true,
                message: `categories`,
                data: success
            });
        })
        .catch(error => {
            return res.json({
                status: false,
                message: `something went wrong`
            });
        })
}


//=============== USER APIS ==============//
exports.getAllUsers = async (req, res) => {
    await users.find()
        .then(success => {
            return res.json({
                status: true,
                message: `users`,
                data: success
            });
        })
        .catch(error => {
            return res.json({
                status: false,
                message: `something went wrong`
            });
        })
}

exports.userBanUnban = async (req, res) => {
    const { userId } = req.params
    const { status } = req.body

    const missingFields = ['status']
        .filter(field => !req.body[field]);

    if (missingFields.length > 0) {
        return res.json({
            status: false,
            message: `Missing required fields: ${missingFields.join(', ')}`
        });
    }


    await users.findByIdAndUpdate({ _id: userId }, {
        $set: {
            isBanned: status === "BAN" ? true : status === "UNBAN" ? false : false
        }
    })
        .then(success => {
            return res.json({
                status: true,
                message: `user ${status}`,
                data: success
            });
        })
        .catch(error => {
            return res.json({
                status: false,
                message: `something went wrong`
            });
        })
}

//=============== CLOUDINARY APIS ==============//
cloudinary.config({
    cloud_name: 'dpq8jfqt7',
    api_key: '741853831973544',
    api_secret: 'XvRvuZ43m1FhGVqDZTZyjxphaCY',
});

exports.uploadImages = async (req, res) => {
    try {
        const files = req.files;
        console.log(files);
        const { folderName, productId } = req.params;

        const isValidProduct = await products.findOne({ _id: new mongoose.Types.ObjectId(productId) });
        if (!isValidProduct) {
            return res.json({
                status: 0,
                message: 'Product not found'
            });
        }

        const uploadResults = await Promise.all(uploadPromises);

        await products.updateOne(
            { _id: new mongoose.Types.ObjectId(productId) },
            {
                $set: {
                    images: uploadResults.map((result) => result.secure_url)
                }
            }
        ).then((success) => {
            if (success) {
                return res.json({
                    status: 1,
                    message: 'Upload successful',
                    data: uploadResults
                });
            } else {
                return res.json({
                    status: 0,
                    message: 'Upload failed'
                });
            }
        });
    } catch (error) {
        res.json({
            status: 0,
            message: error.message
        });
    }
};

exports.uploadFolder = async (req, res) => {
    try {
        cloudinary.api.resources({ type: "upload", prefix: "test/" }, function (error, result) { console.log(error, result) })

    } catch (error) {
        res.json({
            status: 0,
            message: error.message
        })
    }
}

//=============== FAQ APIS ==============//
exports.createFaq = async (req, res) => {
    const { question, answer } = req.body

    const missingFields = ['question', 'answer']
        .filter(field => !req.body[field]);

    if (missingFields.length > 0) {
        return res.json({
            status: false,
            message: `Missing required fields: ${missingFields.join(', ')}`
        });
    }

    await new faqs({
        question,
        answer
    })
        .save()
        .then(success => {
            return res.json({
                status: true,
                message: `faq created`,
                data: success
            });
        })
        .catch(error => {
            return res.json({
                status: false,
                message: `something went wrong`
            });
        })
}

exports.getAllFaqs = async (req, res) => {
    await faqs.find()
        .then(success => {
            return res.json({
                status: true,
                message: `faqs`,
                data: success
            });
        })
        .catch(error => {
            return res.json({
                status: false,
                message: `something went wrong`
            });
        })
}

exports.updatefaq = async (req, res) => {
    const { faqId } = req.params
    const update_data = req.body

    const isFaqExists = await faqs.findOne({ _id: new mongoose.Types.ObjectId(faqId) });
    if (!isFaqExists) {
        return res.json({
            status: false,
            message: `faq not found`
        });
    }

    if (update_data.length == 0) {
        return res.json({
            status: false,
            message: `please provide data for update`
        });
    }

    await faqs.updateOne(
        { _id: new mongoose.Types.ObjectId(faqId) },
        {
            $set: update_data
        }
    )
        .then(success => {
            return res.json({
                status: true,
                message: `faq updated`,
                data: success
            })
        })
        .catch(error => {
            return res.json({
                status: false,
                message: `something went wrong`
            })
        })
}

//=============== Ticket APIS ==============//