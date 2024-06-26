const predictClassification = require('../services/inferenceService');
const crypto = require('crypto');

const storeData = require('../services/storeData');

async function postPredictHandler(request, h) {
    const { image } = request.payload;
    const maxAllowedLength = 1000000;

    if (Buffer.byteLength(image) > maxAllowedLength){
        const response = h.response({
            status: 'fail',
            message: `Payload content length greater than maximum allowed: ${maxAllowedLength}`
        }).code(413);
        return response;
    }
    const { model } = request.server.app;
   
    const { confidenceScore, label, explanation, suggestion } = await predictClassification(model, image);
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();
   
    const data = {
      "id": id,
      "result": label,
      "explanation": explanation,
      "suggestion": suggestion,
      "confidenceScore": confidenceScore,
      "createdAt": createdAt
    }

    await storeData(id, data);
   
    const response = h.response({
      status: 'success',
      message: confidenceScore > 99 ? 'Model is predicted successfully' : 'Model is predicted successfully',
      data
    })
      response.code(201);
      return response;
    }
    
   
    module.exports = postPredictHandler;