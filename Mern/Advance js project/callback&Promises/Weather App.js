class WeatherApp {
    constructor() {
        this.apiKey = 'demo_key';
        this.cache = new Map();
    }
    
    async fetchWeatherData(city) {
        const cacheKey = `weather_${city}`;
        
        // Check cache first
        if (this.cache.has(cacheKey)) {
            console.log('Returning cached data');
            return this.cache.get(cacheKey);
        }
        
        try {
            const weatherData = await this.simulateWeatherAPI(city);
            this.cache.set(cacheKey, weatherData);
            return weatherData;
        } catch (error) {
            console.error('Weather API failed:', error);
            throw error;
        }
    }
    
    async fetchForecast(city) {
        try {
            return await this.simulateForecastAPI(city);
        } catch (error) {
            console.error('Forecast API failed:', error);
            throw error;
        }
    }
    
    async fetchAirQuality(city) {
        try {
            return await this.simulateAirQualityAPI(city);
        } catch (error) {
            console.error('Air quality API failed:', error);
            throw error;
        }
    }
    
    async getCompleteWeatherReport(city) {
        try {
            console.log(`Fetching weather report for ${city}...`);
            
            // Fetch current weather first (required)
            const currentWeather = await this.fetchWeatherData(city);
            
            // Fetch forecast and air quality in parallel (optional)
            const results = await Promise.allSettled([
                this.fetchForecast(city),
                this.fetchAirQuality(city)
            ]);
            
            const forecast = results[0].status === 'fulfilled' ? results[0].value : null;
            const airQuality = results[1].status === 'fulfilled' ? results[1].value : null;
            
            const report = {
                city,
                current: currentWeather,
                forecast: forecast,
                airQuality: airQuality,
                timestamp: new Date().toISOString(),
                warnings: []
            };
            
            // Add warnings based on conditions
            if (currentWeather.temperature > 35) {
                report.warnings.push('High temperature warning');
            }
            
            if (airQuality && airQuality.index > 100) {
                report.warnings.push('Poor air quality warning');
            }
            
            console.log('Weather report ready:', report);
            return report;
            
        } catch (error) {
            console.error(`Failed to get weather report for ${city}:`, error);
            throw error;
        }
    }
    
    // Simulate API calls with realistic delays and potential failures
    async simulateWeatherAPI(city) {
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
        
        if (Math.random() < 0.1) { // 10% chance of failure
            throw new Error('Weather API temporarily unavailable');
        }
        
        return {
            temperature: Math.floor(Math.random() * 40) + 10,
            humidity: Math.floor(Math.random() * 100),
            description: ['sunny', 'cloudy', 'rainy', 'snowy'][Math.floor(Math.random() * 4)],
            windSpeed: Math.floor(Math.random() * 30) + 5
        };
    }
    
    async simulateForecastAPI(city) {
        await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 800));
        
        if (Math.random() < 0.15) { // 15% chance of failure
            throw new Error('Forecast API temporarily unavailable');
        }
        
        return Array.from({ length: 5 }, (_, i) => ({
            day: i + 1,
            temperature: Math.floor(Math.random() * 35) + 15,
            description: ['sunny', 'cloudy', 'rainy'][Math.floor(Math.random() * 3)]
        }));
    }
    
    async simulateAirQualityAPI(city) {
        await new Promise(resolve => setTimeout(resolve, 1200 + Math.random() * 800));
        
        if (Math.random() < 0.2) { // 20% chance of failure
            throw new Error('Air quality API temporarily unavailable');
        }
        
        return {
            index: Math.floor(Math.random() * 200),
            quality: ['Good', 'Moderate', 'Poor', 'Unhealthy'][Math.floor(Math.random() * 4)]
        };
    }
    
    // Utility method to handle multiple cities
    async getWeatherForMultipleCities(cities) {
        const results = await Promise.allSettled(
            cities.map(city => this.getCompleteWeatherReport(city))
        );
        
        const successful = [];
        const failed = [];
        
        results.forEach((result, index) => {
            if (result.status === 'fulfilled') {
                successful.push(result.value);
            } else {
                failed.push({
                    city: cities[index],
                    error: result.reason.message
                });
            }
        });
        
        return { successful, failed };
    }
 }
 // Usage examples
 async function runWeatherApp() {
    const app = new WeatherApp();
    
    try {
        // Single city report
        const report = await app.getCompleteWeatherReport('New York');
        console.log('Single city report:', report);
        
        // Multiple cities
        const cities = ['London', 'Tokyo', 'Sydney', 'Paris'];
        const multipleReports = await app.getWeatherForMultipleCities(cities);
        console.log('Multiple cities:', multipleReports);
        
    } catch (error) {
        console.error('App error:', error);
    }
 }
 // Run the app
 runWeatherApp()