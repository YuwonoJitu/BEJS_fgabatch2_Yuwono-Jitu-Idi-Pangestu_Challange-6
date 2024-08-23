const prisma = require('../libs/prisma');
const imagekit = require('../libs/imagekit');

// Mengunggah gambar bersama dengan judul dan deskripsi
const uploadImage = async (req, res) => {
    try {
        const { title, description } = req.body;
        
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const uploadResponse = await imagekit.upload({
            file: req.file.buffer.toString('base64'), 
            fileName: req.file.originalname,
            folder: "/image-assets" // Folder di ImageKit
        });

        const imageUrl = uploadResponse.url;
        const fileId = uploadResponse.fileId; // Simpan fileId dari respon upload

        const newImage = await prisma.image.create({
            data: {
                title,
                description,
                imageUrl,
                fileId // Simpan fileId ke database
            }
        });

        res.status(201).json({
            status: true,
            message: 'Image uploaded successfully',
            data: newImage
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Melihat daftar gambar yang telah diunggah beserta informasi terkait
const getImages = async (req, res) => {
    try {
        const images = await prisma.image.findMany();
        res.status(200).json({
            status: true,
            data: images
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Melihat detail gambar beserta informasi terkait
const getImageDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const image = await prisma.image.findUnique({
            where: { id: parseInt(id) }
        });

        if (!image) {
            return res.status(404).json({ message: "Image not found" });
        }

        res.status(200).json({
            status: true,
            data: image
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Menghapus gambar
const deleteImage = async (req, res) => {
    try {
        const { id } = req.params;
        const imageId = parseInt(id, 10);

        if (isNaN(imageId)) {
            return res.status(400).json({ message: "ID gambar tidak valid" });
        }

        // Temukan gambar berdasarkan ID
        const image = await prisma.image.findUnique({
            where: { id: imageId }
        });

        if (!image) {
            return res.status(404).json({ message: "Gambar tidak ditemukan" });
        }

        // Ambil fileId dari database
        const fileId = image.fileId;

        if (!fileId) {
            return res.status(400).json({ message: "File ID tidak ditemukan" });
        }

        // Coba hapus file dengan fileId yang disimpan
        const result = await imagekit.deleteFile(fileId);
        console.log('Hasil penghapusan:', result);

        // Hapus data gambar dari Prisma
        await prisma.image.delete({
            where: { id: imageId }
        });

        res.status(200).json({ message: "Gambar berhasil dihapus" });

    } catch (error) {
        console.error('Error deleting image:', error.message);
        res.status(500).json({ message: 'Gagal menghapus gambar dari ImageKit' });
    }
};

// Mengedit judul dan deskripsi gambar yang telah diunggah
const updateImage = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        const image = await prisma.image.findUnique({
            where: { id: parseInt(id) }
        });

        if (!image) {
            return res.status(404).json({ message: "Image not found" });
        }

        // Jika ada file baru di request, update gambar di ImageKit
        let newImageUrl = image.imageUrl;
        let newFileId = image.fileId;

        if (req.file) {
            // Hapus gambar lama dari ImageKit
            if (image.fileId) {
                await imagekit.deleteFile(image.fileId);
            }

            // Unggah gambar baru ke ImageKit
            const uploadResponse = await imagekit.upload({
                file: req.file.buffer.toString('base64'), 
                fileName: req.file.originalname,
                folder: "/image-assets" // Folder di ImageKit
            });

            newImageUrl = uploadResponse.url;
            newFileId = uploadResponse.fileId;
        }

        // Update data gambar di database
        const updatedImage = await prisma.image.update({
            where: { id: parseInt(id) },
            data: {
                title,
                description,
                imageUrl: newImageUrl,
                fileId: newFileId
            }
        });

        res.status(200).json({
            status: true,
            message: 'Image updated successfully',
            data: updatedImage
        });
    } catch (error) {
        console.error('Error updating image:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    uploadImage,
    getImages,
    getImageDetails,
    deleteImage,
    updateImage
};
