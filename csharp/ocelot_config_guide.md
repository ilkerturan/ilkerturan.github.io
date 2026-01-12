# Ocelot API Gateway Configuration Guide

Ocelot, .NET tabanlı uygulamalar için açık kaynaklı bir API Gateway kütüphanesidir. Bu doküman, temel Ocelot yapılandırma dosyası (`ocelot.json`) için referans niteliğindedir.

## Temel Yapı

```json
{
  "Routes": [ /* Route tanımlamaları */ ],
  "GlobalConfiguration": { /* Global ayarlar */ }
}
```

## Routes (Rotalar)

Her rota, gelen isteklerin nasıl yönlendirileceğini tanımlar.

### Temel Rota Yapısı

```json
{
  "DownstreamHostAndPorts": [
    {
      "Host": "hedef-sunucu-adresi",
      "Port": 8080
    }
  ],
  "DownstreamScheme": "https",
  "DownstreamPathTemplate": "/hedef/api/yolu",
  "UpstreamHttpMethod": [ "GET", "POST" ],
  "UpstreamPathTemplate": "/gateway/yolu"
}
```

### Parametre Açıklamaları

#### DownstreamHostAndPorts
Hedef servisin barındırıldığı sunucu bilgileri. Birden fazla sunucu tanımlanarak yük dengeleme (load balancing) yapılabilir.

```json
"DownstreamHostAndPorts": [
  {
    "Host": "service1.example.com",
    "Port": 8080
  },
  {
    "Host": "service2.example.com",
    "Port": 8080
  }
]
```

- **Host**: Hedef servisin domain veya IP adresi
- **Port**: Hedef servisin port numarası

#### DownstreamScheme
Hedef servise yapılacak isteğin protokolü.

- `"http"`: HTTP protokolü
- `"https"`: HTTPS protokolü (güvenli bağlantı)

#### DownstreamPathTemplate
Hedef servisteki API endpoint yolu. Dinamik parametreler süslü parantez içinde tanımlanabilir.

**Örnekler:**
```json
"DownstreamPathTemplate": "/api/users"
"DownstreamPathTemplate": "/api/users/{userId}"
"DownstreamPathTemplate": "/api/products/{category}/{id}"
```

#### UpstreamHttpMethod
Gateway'e gelen isteklerde kabul edilecek HTTP metodları.

```json
"UpstreamHttpMethod": [ "GET" ]
"UpstreamHttpMethod": [ "GET", "POST" ]
"UpstreamHttpMethod": [ "GET", "POST", "PUT", "DELETE" ]
```

#### UpstreamPathTemplate
Gateway üzerinden erişilecek public API yolu. Bu, dış dünyaya açılan adrestir.

```json
"UpstreamPathTemplate": "/api/v1/kullanicilar"
"UpstreamPathTemplate": "/api/v1/kullanicilar/{id}"
```

### Path Parametreleri Kullanımı

Dinamik URL parametreleri hem upstream hem de downstream tarafta eşleştirilebilir:

```json
{
  "DownstreamPathTemplate": "/api/products/{productId}/reviews/{reviewId}",
  "UpstreamPathTemplate": "/products/{productId}/reviews/{reviewId}"
}
```

**Kullanım:** 
- İstek: `GET /products/123/reviews/456`
- Yönlendirilir: `GET /api/products/123/reviews/456`

## GlobalConfiguration

Gateway genelinde geçerli olan ayarları içerir.

```json
"GlobalConfiguration": {
  "BaseUrl": "https://api-gateway.example.com"
}
```

### BaseUrl
API Gateway'in dışarıya açılan temel URL'i. Bu adres, location header'larında ve diğer referanslarda kullanılır.

## Gelişmiş Özellikler

### Rate Limiting (İstek Sınırlama)

```json
{
  "DownstreamPathTemplate": "/api/resource",
  "UpstreamPathTemplate": "/resource",
  "RateLimitOptions": {
    "ClientWhitelist": [],
    "EnableRateLimiting": true,
    "Period": "1s",
    "PeriodTimespan": 1,
    "Limit": 10
  }
}
```

### Authentication (Kimlik Doğrulama)

```json
{
  "DownstreamPathTemplate": "/api/secure",
  "UpstreamPathTemplate": "/secure",
  "AuthenticationOptions": {
    "AuthenticationProviderKey": "Bearer",
    "AllowedScopes": []
  }
}
```

### Load Balancer (Yük Dengeleme)

```json
{
  "DownstreamHostAndPorts": [
    { "Host": "service1.com", "Port": 80 },
    { "Host": "service2.com", "Port": 80 }
  ],
  "LoadBalancerOptions": {
    "Type": "RoundRobin"
  }
}
```

**Load Balancer Tipleri:**
- `LeastConnection`: En az aktif bağlantısı olan sunucuya yönlendir
- `RoundRobin`: Sırayla tüm sunuculara dağıt
- `NoLoadBalancer`: Yük dengeleme yapma

### Service Discovery (Servis Keşfi)

```json
{
  "DownstreamPathTemplate": "/api/users",
  "UpstreamPathTemplate": "/users",
  "ServiceName": "user-service",
  "LoadBalancerOptions": {
    "Type": "RoundRobin"
  }
}
```

Consul veya Eureka gibi service discovery araçlarıyla entegre çalışır.

### Caching (Önbellekleme)

```json
{
  "DownstreamPathTemplate": "/api/data",
  "UpstreamPathTemplate": "/data",
  "FileCacheOptions": {
    "TtlSeconds": 30,
    "Region": "data-cache"
  }
}
```

### QoS (Quality of Service)

```json
{
  "QoSOptions": {
    "ExceptionsAllowedBeforeBreaking": 3,
    "DurationOfBreak": 1000,
    "TimeoutValue": 5000
  }
}
```

## Örnek Senaryolar

### 1. Basit Proxy (Tek Servis Yönlendirme)

```json
{
  "DownstreamHostAndPorts": [
    { "Host": "internal-api.local", "Port": 8080 }
  ],
  "DownstreamScheme": "http",
  "DownstreamPathTemplate": "/api/weather",
  "UpstreamHttpMethod": [ "GET" ],
  "UpstreamPathTemplate": "/weather"
}
```

### 2. Mikroservis Mimarisi

```json
{
  "Routes": [
    {
      "DownstreamHostAndPorts": [
        { "Host": "user-service", "Port": 80 }
      ],
      "DownstreamPathTemplate": "/api/users/{userId}",
      "UpstreamPathTemplate": "/users/{userId}",
      "UpstreamHttpMethod": [ "GET", "PUT", "DELETE" ]
    },
    {
      "DownstreamHostAndPorts": [
        { "Host": "order-service", "Port": 80 }
      ],
      "DownstreamPathTemplate": "/api/orders",
      "UpstreamPathTemplate": "/orders",
      "UpstreamHttpMethod": [ "GET", "POST" ]
    },
    {
      "DownstreamHostAndPorts": [
        { "Host": "product-service", "Port": 80 }
      ],
      "DownstreamPathTemplate": "/api/products",
      "UpstreamPathTemplate": "/products",
      "UpstreamHttpMethod": [ "GET" ]
    }
  ]
}
```

### 3. External API Integration

```json
{
  "DownstreamHostAndPorts": [
    { "Host": "api.external-service.com", "Port": 443 }
  ],
  "DownstreamScheme": "https",
  "DownstreamPathTemplate": "/v1/data/{id}",
  "UpstreamPathTemplate": "/external/data/{id}",
  "UpstreamHttpMethod": [ "GET" ]
}
```

## Best Practices (En İyi Uygulamalar)

1. **HTTPS Kullanımı**: Production ortamında her zaman HTTPS kullanın.

2. **Versiyonlama**: API'lerinizi versiyonlayın.
   ```json
   "UpstreamPathTemplate": "/api/v1/resource"
   ```

3. **Rate Limiting**: Kötüye kullanımı önlemek için istek sınırlaması uygulayın.

4. **Monitoring**: Loglama ve monitoring araçlarını entegre edin.

5. **Security**: Authentication ve authorization mekanizmalarını kullanın.

6. **Timeout Ayarları**: QoS ayarlarıyla uygun timeout değerleri belirleyin.

7. **Circuit Breaker**: Hatalı servislerin tüm sistemi etkilememesi için circuit breaker pattern kullanın.

## Kaynaklar

- [Ocelot Resmi Dokümantasyonu](https://ocelot.readthedocs.io/)
- [GitHub Repository](https://github.com/ThreeMammals/Ocelot)

## Lisans

Bu doküman bilgilendirme amaçlıdır. Ocelot, MIT lisansı altında dağıtılmaktadır.
