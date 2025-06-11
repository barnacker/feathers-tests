"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const feathers_1 = require("@feathersjs/feathers");
const socketio_client_1 = __importDefault(require("@feathersjs/socketio-client"));
const socket_io_client_1 = require("socket.io-client");
// Initialize Feathers client with Socket.io
const app = (0, feathers_1.feathers)();
const socket = (0, socket_io_client_1.io)('http://localhost:3030'); // Replace with your Feathers server URL
app.configure((0, socketio_client_1.default)(socket));
// Get the users service
const userService = app.service('users');
// Function to generate random string
function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}
// Function to get random item from array
function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}
// Function to generate random phone number
function generatePhoneNumber() {
    const areaCode = Math.floor(Math.random() * 900) + 100;
    const exchange = Math.floor(Math.random() * 900) + 100;
    const number = Math.floor(Math.random() * 9000) + 1000;
    return `+1-${areaCode}-${exchange}-${number}`;
}
// Function to generate random date
function generateRandomDate(startYear, endYear) {
    const start = new Date(startYear, 0, 1);
    const end = new Date(endYear, 11, 31);
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return randomDate.toISOString();
}
// Function to generate a random user (approximately 1KB)
function generateRandomUser(id) {
    const firstNames = [
        'Alexandre',
        'Marie',
        'Jean',
        'Sophie',
        'Pierre',
        'Julie',
        'Marc',
        'Catherine',
        'David',
        'Anne',
    ];
    const lastNames = [
        'Tremblay',
        'Gagnon',
        'Roy',
        'Côté',
        'Bouchard',
        'Gauthier',
        'Morin',
        'Lavoie',
        'Fortin',
        'Gagné',
    ];
    const cities = [
        'Montréal',
        'Québec',
        'Laval',
        'Gatineau',
        'Longueuil',
        'Sherbrooke',
        'Saguenay',
        'Lévis',
        'Trois-Rivières',
        'Terrebonne',
    ];
    const companies = [
        'TechCorp Solutions',
        'InnovatePro Inc.',
        'Digital Dynamics',
        'FutureTech Labs',
        'CodeCraft Studio',
    ];
    const departments = [
        'Développement Frontend',
        'Backend Engineering',
        'DevOps',
        'Data Science',
        'UX/UI Design',
    ];
    const occupations = [
        'Développeur Full-Stack',
        'Architecte Logiciel',
        'Data Scientist',
        'Designer UX',
        'Chef de Projet',
    ];
    const skills = [
        'JavaScript',
        'TypeScript',
        'React',
        'Node.js',
        'Python',
        'Docker',
        'AWS',
        'MongoDB',
        'PostgreSQL',
        'GraphQL',
    ];
    const interests = [
        'programmation',
        'intelligence artificielle',
        'blockchain',
        'gaming',
        'lecture',
        'voyage',
        'photographie',
        'musique',
    ];
    const sources = ['web_registration', 'mobile_app', 'api_integration', 'bulk_import', 'admin_creation'];
    const referrers = [
        'google_ads_campaign_2024',
        'facebook_ads',
        'linkedin_referral',
        'word_of_mouth',
        'direct_traffic',
    ];
    const firstName = getRandomItem(firstNames);
    const lastName = getRandomItem(lastNames);
    const city = getRandomItem(cities);
    return {
        firstName,
        lastName,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${id}@example.com`,
        password: `pass${id}${generateRandomString(12)}`,
        username: `${firstName.toLowerCase()}${lastName.toLowerCase()}${id}`,
        displayName: `${firstName} ${lastName}`,
        bio: `Professionnel passionné par la technologie et l'innovation. Spécialisé dans le développement d'applications modernes et performantes. Toujours à la recherche de nouveaux défis techniques.`,
        location: `${city}, QC, Canada`,
        website: `https://${firstName.toLowerCase()}-${lastName.toLowerCase()}-portfolio.dev`,
        phoneNumber: generatePhoneNumber(),
        dateOfBirth: generateRandomDate(1980, 2000).split('T')[0],
        gender: getRandomItem(['male', 'female', 'non-binary', 'prefer-not-to-say']),
        language: getRandomItem(['fr-CA', 'en-CA', 'fr-FR', 'en-US']),
        timezone: 'America/Montreal',
        occupation: getRandomItem(occupations),
        company: getRandomItem(companies),
        department: getRandomItem(departments),
        employeeId: `EMP-2024-${String(id).padStart(6, '0')}`,
        joinDate: generateRandomDate(2020, 2024),
        lastLoginDate: generateRandomDate(2024, 2024),
        isActive: Math.random() > 0.1, // 90% active
        isVerified: Math.random() > 0.2, // 80% verified
        isPremium: Math.random() > 0.7, // 30% premium
        role: getRandomItem(['user', 'developer', 'admin', 'moderator']),
        permissions: getRandomItem([
            ['read', 'write'],
            ['read', 'write', 'create'],
            ['read', 'write', 'create', 'update'],
            ['read', 'write', 'create', 'update', 'delete'],
        ]),
        preferences: {
            theme: getRandomItem(['light', 'dark', 'auto']),
            notifications: {
                email: Math.random() > 0.3,
                push: Math.random() > 0.4,
                sms: Math.random() > 0.8,
            },
            privacy: {
                profileVisible: Math.random() > 0.2,
                emailVisible: Math.random() > 0.7,
                phoneVisible: Math.random() > 0.8,
            },
        },
        socialMedia: {
            linkedin: `https://linkedin.com/in/${firstName.toLowerCase()}-${lastName.toLowerCase()}-dev`,
            github: `https://github.com/${firstName.toLowerCase()}${lastName.toLowerCase()}codes`,
            twitter: `@${firstName.toLowerCase()}_${lastName.toLowerCase()}_dev`,
        },
        skills: skills.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 6) + 3),
        interests: interests.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 4) + 2),
        address: {
            street: `${Math.floor(Math.random() * 9999) + 1} Rue ${getRandomItem(['de la Technologie', 'du Innovation', 'des Développeurs', "de l'Avenir", 'du Numérique'])}`,
            city,
            province: 'QC',
            postalCode: `H${Math.floor(Math.random() * 9) + 1}${String.fromCharCode(65 + Math.floor(Math.random() * 26))} ${Math.floor(Math.random() * 9)}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(Math.random() * 9)}`,
            country: 'Canada',
        },
        emergencyContact: {
            name: `${getRandomItem(firstNames)} ${getRandomItem(lastNames)}`,
            relationship: getRandomItem(['Époux/Épouse', 'Parent', 'Frère/Sœur', 'Ami proche']),
            phone: generatePhoneNumber(),
        },
        metadata: {
            source: getRandomItem(sources),
            referrer: getRandomItem(referrers),
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        },
    };
}
// Async function to create users
async function createUsers(count = 2000) {
    try {
        console.log(`Starting creation of ${count} users...`);
        for (let i = 0; i < count; i++) {
            const user = generateRandomUser(i);
            await userService.create(user);
            // Log progress every 100 users
            if ((i + 1) % 100 === 0) {
                console.log(`Created ${i + 1}/${count} users`);
            }
        }
        console.log(`Successfully created ${count} users.`);
    }
    catch (error) {
        console.error('Error creating users:', error);
    }
}
// Run the function
createUsers(2000);
