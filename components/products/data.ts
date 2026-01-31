import { Product } from "./shared/types";

export const products: Product[] = [
  {
    id: 1,
    identity: {
      name: "DARK OATH",
      sku: "NCT-001",
      tagline: "THE VOW",
      year: "EST. 2026",
      batch: "A-001",
      family: "Oryantal / Deri",
      concentration: "30% Extrait",
      origin: "Grasse, Fransa"
    },
    assets: {
      image: "/dark-oath.jpeg",
      texture: "/textures/leather.jpg"
    },
    palette: {
      primary: "#D4AF37", // Gold
      secondary: "#0a0a0a",
      accent: "#8a6d1c",
      glow: "rgba(212, 175, 55, 0.12)",
      gradient: "radial-gradient(circle at 50% 50%, #1a1205 0%, #000000 90%)",
      particleColor: "rgba(212, 175, 55, 0.6)"
    },
    narrative: [
      {
        id: 1,
        subtitle: "GECE YARISI",
        text: "Şehir sustuğunda uyananlar için. Deri koltukların gıcırtısı.",
        mood: "Sessiz"
      },
      {
        id: 2,
        subtitle: "MÜHÜR",
        text: "Bu bir koku değil; tene atılan ıslak bir imza. Geri dönüşü olmayan bir yemin.",
        mood: "Otoriter"
      },
      {
        id: 3,
        subtitle: "MİRAS",
        text: "Sen odayı terk ettikten saatler sonra bile, varlığın orayı yönetmeye devam eder.",
        mood: "Unutulmaz"
      }
    ],
    olfactory: {
      top: [
        { name: "Siyah Karabiber", desc: "Soğuk ateş.", type: "Baharat" },
        { name: "İtalyan Bergamot", desc: "Karanlığı delen ışık.", type: "Narenciye" },
        { name: "Menekşe Yaprağı", desc: "Metalik yeşil.", type: "Yeşil" }
      ],
      heart: [
        { name: "Somalya Tütsüsü", desc: "Kutsal duman.", type: "Reçine" },
        { name: "İsli Deri", desc: "Gücün kokusu.", type: "Hayvansal" },
        { name: "Tütün Yaprağı", desc: "Kuru sıcaklık.", type: "Aromatik" }
      ],
      base: [
        { name: "Siyah Ud", desc: "Karanlık reçine.", type: "Odunsu" },
        { name: "Haiti Vetiveri", desc: "Toprak kökü.", type: "Topraksı" },
        { name: "Sandal Ağacı", desc: "Kremsi veda.", type: "Odunsu" }
      ]
    },
    lifestyle: {
      outfit: "Siyah Deri Ceket",
      drink: "İsli Single Malt",
      music: "Viyolonsel Solosu",
      location: "Özel Üye Kulübü",
      time: "00:00 - 04:00"
    },
  },
  {
    id: 2,
    identity: {
      name: "OUTLAND",
      sku: "NCT-002",
      tagline: "THE FRONTIER",
      year: "EST. 2026",
      batch: "B-002",
      family: "Odunsu / Aromatik",
      concentration: "30% Extrait",
      origin: "Toskana, İtalya"
    },
    assets: {
      image: "/outland.jpeg",
      texture: "/textures/sand.jpg"
    },
    palette: {
      primary: "#ea580c", // Burnt Orange
      secondary: "#0f0502",
      accent: "#7c2d12",
      glow: "rgba(234, 88, 12, 0.12)",
      gradient: "radial-gradient(circle at 50% 50%, #1f0a05 0%, #000000 90%)",
      particleColor: "rgba(234, 88, 12, 0.6)"
    },
    narrative: [
      {
        id: 1,
        subtitle: "SINIR",
        text: "Haritanın bittiği yer. Medeniyetin kurallarının geçersiz olduğu o kızıl topraklar.",
        mood: "Vahşi"
      },
      {
        id: 2,
        subtitle: "DOĞA",
        text: "Yağmurun kurak toprağa ilk düştüğü an çıkan o çiğ, elektrikli ve ilkel koku.",
        mood: "Organik"
      },
      {
        id: 3,
        subtitle: "KEŞİF",
        text: "Bilinmeyene doğru atılan ilk adımın verdiği o tekinsiz ama bağımlılık yapan heyecan.",
        mood: "Özgür"
      }
    ],
    olfactory: {
      top: [
        { name: "Ardıç Meyveleri", desc: "Cin tonik ferahlığı.", type: "Aromatik" },
        { name: "Biberiye", desc: "Güneş yanığı otlar.", type: "Ot" },
        { name: "Adaçayı", desc: "Arındırıcı buhar.", type: "Ot" }
      ],
      heart: [
        { name: "Islak Toprak", desc: "Yağmur sonrası.", type: "Mineral" },
        { name: "Çam Reçinesi", desc: "Yapışkan öz.", type: "Reçine" },
        { name: "Sedir", desc: "Kuru odun.", type: "Odunsu" }
      ],
      base: [
        { name: "Meşe Yosunu", desc: "Nemli orman.", type: "Yosun" },
        { name: "Paçuli", desc: "Karanlık kökler.", type: "Odunsu" },
        { name: "Amber", desc: "Fosilleşmiş güneş.", type: "Reçine" }
      ]
    },
    lifestyle: {
      outfit: "Keten Gömlek, Bot",
      drink: "Negroni",
      music: "Desert Rock",
      location: "Açık Hava, Kanyon",
      time: "Gün Batımı"
    },
  },
  {
    id: 3,
    identity: {
      name: "GHOST TOWN",
      sku: "NCT-003",
      tagline: "THE MEMORY",
      year: "EST. 2026",
      batch: "C-003",
      family: "Mineral / Misk",
      concentration: "30% Extrait",
      origin: "İzlanda"
    },
    assets: {
      image: "/ghost-town.jpeg",
      texture: "/textures/fog.jpg"
    },
    palette: {
      primary: "#9ca3af", // Silver
      secondary: "#05070a",
      accent: "#4b5563",
      glow: "rgba(156, 163, 175, 0.12)",
      gradient: "radial-gradient(circle at 50% 50%, #0d1117 0%, #000000 90%)",
      particleColor: "rgba(200, 200, 200, 0.4)"
    },
    narrative: [
      {
        id: 1,
        subtitle: "TERK EDİLİŞ",
        text: "Boş bir sahil kasabası. Kırık camlardan içeri dolan soğuk, tuzlu rüzgar.",
        mood: "Melankolik"
      },
      {
        id: 2,
        subtitle: "HAYALET",
        text: "Sönmüş bir ateşten kalan küller. Varlığın değil, yokluğun en güçlü olduğu o an.",
        mood: "Sessiz"
      },
      {
        id: 3,
        subtitle: "ANILAR",
        text: "Asla geri gelmeyecek olan o anın, zihinde bıraktığı silik ve flu fotoğraf.",
        mood: "Nostaljik"
      }
    ],
    olfactory: {
      top: [
        { name: "Metalik Aldehitler", desc: "Soğuk bıçak.", type: "Sentetik" },
        { name: "Deniz Tuzu", desc: "Tuzlu tat.", type: "Mineral" },
        { name: "Ozon", desc: "Elektrikli hava.", type: "Havadar" }
      ],
      heart: [
        { name: "Menekşe", desc: "Pudralı hüzün.", type: "Çiçeksi" },
        { name: "Soğuk Kül", desc: "Yanmış odun.", type: "Duman" },
        { name: "Hafif Tütsü", desc: "Uzak dua.", type: "Reçine" }
      ],
      base: [
        { name: "Mineral Akoru", desc: "Islak taşlar.", type: "Mineral" },
        { name: "Beyaz Misk", desc: "Temiz ten.", type: "Misk" },
        { name: "Sedir", desc: "Yıkanmış odun.", type: "Odunsu" }
      ]
    },
    lifestyle: {
      outfit: "Oversize Gri Palto",
      drink: "Votka Martini (Dry)",
      music: "Ambient Piyano",
      location: "Sanat Galerisi",
      time: "Sabahın Erken Saatleri"
    },
  },
  {
    id: 4,
    identity: {
      name: "LIQUID CHROME",
      sku: "NCT-004",
      tagline: "THE FUTURE",
      year: "EST. 2026",
      batch: "D-004",
      family: "Narenciye / Metalik",
      concentration: "30% Extrait",
      origin: "Tokyo, Japonya"
    },
    assets: {
      image: "/liquid-chrome.jpeg",
      texture: "/textures/metal.jpg"
    },
    palette: {
      primary: "#22d3ee", // Cyan
      secondary: "#02080a",
      accent: "#0e7490",
      glow: "rgba(34, 211, 238, 0.12)",
      gradient: "radial-gradient(circle at 50% 50%, #021217 0%, #000000 90%)",
      particleColor: "rgba(34, 211, 238, 0.6)"
    },
    narrative: [
      {
        id: 1,
        subtitle: "HIZ",
        text: "Tokyo otobanında gece yarısı. Neon ışıklarının ıslak asfalttaki yansıması.",
        mood: "Elektrikli"
      },
      {
        id: 2,
        subtitle: "METAL",
        text: "Sıcak bir dilde eriyen buz parçası. Steril, kusursuz, soğuk ve yapay.",
        mood: "Fütüristik"
      },
      {
        id: 3,
        subtitle: "YARIN",
        text: "Gelecek henüz gelmedi, ama kokusu şimdiden teninde. Metalik bir rüya.",
        mood: "Sentetik"
      }
    ],
    olfactory: {
      top: [
        { name: "Buzlu Greyfurt", desc: "Şoklayıcı soğuk.", type: "Narenciye" },
        { name: "Misket Limonu", desc: "Asidik enerji.", type: "Narenciye" },
        { name: "Taze Nane", desc: "Mentollü nefes.", type: "Ot" }
      ],
      heart: [
        { name: "Limon Otu", desc: "Yeşil enerji.", type: "Ot" },
        { name: "Metalik Mineral", desc: "Krom yüzey.", type: "Sentetik" },
        { name: "Cin Akoru", desc: "Ardıç alkolü.", type: "İçki" }
      ],
      base: [
        { name: "Beyaz Misk", desc: "Steril temizlik.", type: "Misk" },
        { name: "Beyaz Sedir", desc: "Pürüzsüz yüzey.", type: "Odunsu" },
        { name: "Ambroxan", desc: "Modern derinlik.", type: "Moleküler" }
      ]
    },
    lifestyle: {
      outfit: "Teknik Kumaşlar",
      drink: "Cin Tonik",
      music: "Techno / Synthwave",
      location: "Rooftop Bar",
      time: "Gece Yarısı"
    },
  },
  {
    id: 5,
    identity: {
      name: "SOLAR FLARE",
      sku: "NCT-005",
      tagline: "THE COLLAPSE",
      year: "EST. 2026",
      batch: "E-005",
      family: "Baharatlı / Amber",
      concentration: "30% Extrait",
      origin: "Marakeş, Fas"
    },
    assets: {
      image: "/solar-flare.jpeg",
      texture: "/textures/magma.jpg"
    },
    palette: {
      primary: "#ef4444", // Red
      secondary: "#1a0505",
      accent: "#991b1b",
      glow: "rgba(239, 68, 68, 0.12)",
      gradient: "radial-gradient(circle at 50% 50%, #1f0505 0%, #000000 90%)",
      particleColor: "rgba(239, 68, 68, 0.6)"
    },
    narrative: [
      {
        id: 1,
        subtitle: "ÇÖKÜŞ",
        text: "Bir yıldızın ömrünü tamamlayıp içine çöktüğü o sessiz, sıcak ve kırmızı an.",
        mood: "Yoğun"
      },
      {
        id: 2,
        subtitle: "PATLAMA",
        text: "Tarçının ateşi, kehribarın sıcaklığıyla birleşiyor. Yıkıcı bir enerji dalgası.",
        mood: "Tehlikeli"
      },
      {
        id: 3,
        subtitle: "ÇEKİM",
        text: "Yaklaşmaya cesaret edenleri yakan, kaçılması imkansız bir yerçekimi.",
        mood: "Manyetik"
      }
    ],
    olfactory: {
      top: [
        { name: "Kan Portakalı", desc: "Koyu kırmızı su.", type: "Narenciye" },
        { name: "Karabiber", desc: "Gıdıklayan ısı.", type: "Baharat" },
        { name: "Pembe Biber", desc: "Meyvemsi baharat.", type: "Baharat" }
      ],
      heart: [
        { name: "Yanık Tarçın", desc: "Karamelize.", type: "Baharat" },
        { name: "Laden Reçinesi", desc: "Balzamik öz.", type: "Reçine" },
        { name: "Tütsü", desc: "Dumanlı dua.", type: "Reçine" }
      ],
      base: [
        { name: "Sıcak Amber", desc: "Erimiş altın.", type: "Reçine" },
        { name: "Kaşmir Ağacı", desc: "Yumuşak şal.", type: "Odunsu" },
        { name: "Vanilya", desc: "Bağımlılık.", type: "Gourmand" }
      ]
    },
    lifestyle: {
      outfit: "Kadife Ceket",
      drink: "Konyak",
      music: "Caz / Soul",
      location: "Şömine Başı",
      time: "Gece"
    },
  }
];
