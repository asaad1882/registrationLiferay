const express = require('express')
const router = express.Router()
const  { 
    createUser,
    listUsers,
    verifyCaptacha
} = require('../controllers/profile')
router.post('/captach',verifyCaptacha);
/**
 * @openapi
 * /api/v1/users:
 *   post:
 *     summary: create user
 *     description: create user
 *     operationId: createUser
 *     parameters:
 *       - name: x-api-key
 *         in: header
 *         schema:
 *           type: string
 *           example: >-
 *             2058e5972c60bbb97f9654f30e0897b3-4dec5395-6111-4135-ad36-f0892bf06b79
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dob:
 *                 type: string
 *                 example: '1982-08-27'
 *               email:
 *                 type: string
 *                 example: testh@test.com
 *               firstname:
 *                 type: string
 *                 example: Asmaa
 *               surname:
 *                 type: string
 *                 example: Mahmoud
 *           examples:
 *             create user:
 *               value:
 *                 dob: '1982-08-27'
 *                 email: testh@test.com
 *                 firstname: Asmaa
 *                 surname: Mahmoud
 *     tags:
 *       - Users
 *     responses:
 *       201:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resultCode:
 *                   type: string
 *                   example: S
 *                 resultMessage:
 *                   type: string
 *                   example: Success
 *                 errorMessage:
 *                   type: string
 *                   example: Success
 *                 response:
 *                   type: object
 *                   properties: 
 *                     dob:
 *                       type: string
 *                       example: '1982-08-27'
 *                     email:
 *                       type: string
 *                       example: testh@test.com
 *                     firstname:
 *                       type: string
 *                       example: Asmaa
 *                     surname:
 *                       type: string
 *                       example: Mahmoud
 * 
 * 
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resultCode:
 *                   type: string
 *                   example: F
 *                 resultMessage:
 *                   type: string
 *                   example: Failed
 *                 errorMessage:
 *                   type: string
 *                   example: Bad Request
 *       401:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resultCode:
 *                   type: string
 *                   example: F
 *                 resultMessage:
 *                   type: string
 *                   example: Failed
 *                 errorMessage:
 *                   type: string
 *                   example: Forbidden
 *       403:
 *         description: UnAuthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resultCode:
 *                   type: string
 *                   example: F
 *                 resultMessage:
 *                   type: string
 *                   example: Failed
 *                 errorMessage:
 *                   type: string
 *                   example: UnAuthorized
 *       429:
 *         description: Too Many Requests
 *         content:
 *           application/text:
 *             schema:
 *               type: object
 *               properties:
 *                 resultCode:
 *                   type: string
 *                   example: F
 *                 resultMessage:
 *                   type: string
 *                   example: Failed
 *                 errorMessage:
 *                   type: string
 *                   example: You have exceeded your 5 requests per minute limit.
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resultCode:
 *                   type: string
 *                   example: F
 *                 resultMessage:
 *                   type: string
 *                   example: Failed
 *                 errorMessage:
 *                   type: string
 *                   example: Internal Server Error         
 */
router.post('/users',createUser);
/**
 * @openapi
 * /api/v1/users:
 *   get:
 *     summary: list users
 *     description: create user
 *     operationId: createUser
 *     parameters:
 *       - name: x-api-key
 *         in: header
 *         schema:
 *           type: string
 *           example: >-
 *             2058e5972c60bbb97f9654f30e0897b3-4dec5395-6111-4135-ad36-f0892bf06b79
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resultCode:
 *                   type: string
 *                   example: S
 *                 resultMessage:
 *                   type: string
 *                   example: Success
 *                 errorMessage:
 *                   type: string
 *                   example: Success
 *                 response:
 *                   type: object
 *                   properties: 
 *                     dob:
 *                       type: string
 *                       example: '1982-08-27'
 *                     email:
 *                       type: string
 *                       example: testh@test.com
 *                     firstname:
 *                       type: string
 *                       example: Asmaa
 *                     surname:
 *                       type: string
 *                       example: Mahmoud
 * 
 * 
 *       401:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resultCode:
 *                   type: string
 *                   example: F
 *                 resultMessage:
 *                   type: string
 *                   example: Failed
 *                 errorMessage:
 *                   type: string
 *                   example: Forbidden
 *       403:
 *         description: UnAuthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resultCode:
 *                   type: string
 *                   example: F
 *                 resultMessage:
 *                   type: string
 *                   example: Failed
 *                 errorMessage:
 *                   type: string
 *                   example: UnAuthorized
 *       429:
 *         description: Too Many Requests
 *         content:
 *           application/text:
 *             schema:
 *               type: object
 *               properties:
 *                 resultCode:
 *                   type: string
 *                   example: F
 *                 resultMessage:
 *                   type: string
 *                   example: Failed
 *                 errorMessage:
 *                   type: string
 *                   example: You have exceeded your 5 requests per minute limit.
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resultCode:
 *                   type: string
 *                   example: F
 *                 resultMessage:
 *                   type: string
 *                   example: Failed
 *                 errorMessage:
 *                   type: string
 *                   example: Internal Server Error         
 */
router.get('/users',listUsers);
module.exports = router
