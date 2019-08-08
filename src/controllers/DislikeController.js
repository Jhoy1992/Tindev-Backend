const Dev = require('../models/Dev');

module.exports = {
    async store(req, res) {
        const { user } = req.headers;        
        const { devId } = req.params;        

        try {
            const loggedDev = await Dev.findById(user);
            const targetDev = await Dev.findById(devId);            

            loggedDev.dislikes.push(targetDev._id);
            await loggedDev.save();

            return await res.json(loggedDev);
        } catch (error) {
            return res.status(400).json({ error: 'Dev that liked or target dev not exists' });            
        }
        
    }
}