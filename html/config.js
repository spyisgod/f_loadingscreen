window.Config = {

    server: {
        name: "Paradise RP",
        description: "Türkiye'nin En İyi Roleplay Deneyimi",
        discord: "https://discord.gg/paradiserp",
        website: "https://fdevelopment.net"
    },
    

    background: {
        type: "video", // "image", "video" veya "youtube"
        image: {
            path: "assets/background.jpg",
            blur: 0,
            opacity: 1
        },
        video: {
           
            path: "assets/video.webm",
            blur: 0,
            opacity: 1
        },
        youtube: {
            videoId: "r2gxFcFWv10",
            autoplay: true,
            muted: true,
            loop: true,
            controls: false,
            blur: 0,
            opacity: 1
        }
    },
    

    logo: {
        enabled: true,
        path: "assets/logo.png",
        width: "50px",
        height: "auto",
        animation: {
            enabled: true,
            type: "fade"
        }
    },
    

    news: {
        enabled: true,
        title: "HABERLER",
        autoScroll: true,
        scrollInterval: 5000,
        items: [
            {
                title: "Yeni Güncelleme!",
                content: "Paradise RP'ye yeni güncelleme geldi! Yeni araçlar, yeni mekanikler ve daha fazlası sizleri bekliyor.",
                date: "14.03.2026",
                type: "update",
                tag: "Güncelleme",
                image: "assets/news/update.jpg"
            },
            {
                title: "Özel Etkinlik",
                content: "Bu hafta sonu büyük bir yarış etkinliği düzenlenecek. Kazananlara özel ödüller verilecek!",
                date: "13.03.2026",
                type: "event",
                tag: "Etkinlik",
                image: "assets/news/event.jpg"
            },
            {
                title: "Önemli Duyuru",
                content: "Sunucu bakımı nedeniyle yarın 03:00-05:00 saatleri arasında sunucu kapalı olacaktır.",
                date: "12.03.2026",
                type: "announcement",
                tag: "Duyuru"
            },
            {
                title: "Yeni Kurallar",
                content: "Roleplay kurallarımız güncellendi. Lütfen Discord sunucumuzdaki kurallar kanalını okuyunuz.",
                date: "11.03.2026",
                type: "warning",
                tag: "Kurallar"
            }
        ]
    },
    

    loadingBar: {
        smooth: true,
        showPercentage: true,
        showStatus: true,
        statusMessages: [
            "Sunucuya bağlanılıyor...",
            "Kaynaklar yükleniyor...",
            "Scriptler hazırlanıyor...",
            "Harita yükleniyor...",
            "Son hazırlıklar yapılıyor..."
        ],
        colors: {
            bar: "#14b5bd",
            background: "rgba(20, 181, 189, 0.15)",
            text: "#ffffff"
        }
    },
    

    colors: {
        primary: "#14b5bd",
        secondary: "#0f1923",
        text: {
            primary: "#ffffff",
            secondary: "rgba(255, 255, 255, 0.95)"
        },
        background: {
            primary: "rgba(20, 181, 189, 0.85)",
            secondary: "rgba(20, 181, 189, 0.75)"
        }
    },
    

    animations: {
        enabled: true,
        duration: 0.5,
        newsSlide: true,
        logoHover: true,
        buttonHover: true
    }
}; 