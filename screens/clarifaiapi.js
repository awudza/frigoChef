import axios from 'axios';

// Clé API Clarifai (remplace par la tienne)
const PAT = '29346a7d0207488580c6afebc0a49a19'; 
const USER_ID = 'clarifai';       
const APP_ID = 'main';
const MODEL_ID = 'food-item-recognition';
const MODEL_VERSION_ID = '1d5fd481e0cf4826aa72ec3ff049e044';

// Fonction pour analyser une image avec Clarifai
const analyzeImageWithClarifai = async (imageUri) => {
    const url = `https://api.clarifai.com/v2/models/${MODEL_ID}/versions/${MODEL_VERSION_ID}/outputs`;

    // Convertir l'image en base64
    const base64Image = await getBase64Image(imageUri);

    // Corps de la requête
    const body = {
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "base64": base64Image  // Utilisation de base64 au lieu d'une URL
                    }
                }
            }
        ]
    };

    try {
        const response = await axios.post(url, body, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Key ${PAT}`,
                'Content-Type': 'application/json'
            }
        });

        console.log("Réponse Clarifai :", response.data);
        const results = response.data.outputs[0].data.concepts; // Récupérer les aliments détectés
        return results;

    } catch (error) {
        console.error('Erreur lors de l\'analyse avec Clarifai:', error.response ? error.response.data : error.message);
        return null;
    }
};

// Fonction pour convertir une image en base64
const getBase64Image = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
        reader.onloadend = () => resolve(reader.result.split(',')[1]);  // Enlever le préfixe "data:image/jpeg;base64,"
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};

export default analyzeImageWithClarifai;
