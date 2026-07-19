import type { Dict } from './index'

/**
 * Jaku Iban
 * ─────────────────────────────────────────────────────────────
 * MARKED FOR HUMAN VERIFICATION (spec section N).
 * Best-effort Iban translations are provided for navigation,
 * headlines and interface labels. Official, legal and compliance
 * wording is deliberately KEPT IN BAHASA MALAYSIA until a
 * verified Iban translation is approved — inventing unreliable
 * official translations is prohibited by the build specification.
 * Every string below is editable.
 * ─────────────────────────────────────────────────────────────
 */
export const iban: Dict = {
  meta: {
    verificationNotice:
      'Salin jaku Iban benung nganti pengesah. Sekeda isi agi dipandangka dalam Bahasa Malaysia.',
  },
  nav: {
    home: 'Lambar Keterubah',
    pathways: 'Dua Jalai',
    benefits: 'Penguntung',
    journey: 'Pejalai Nuan',
    coach: 'Coach & Team',
    faq: 'Tanya Suah Ditanya',
    participantLogin: 'Log Masuk Peserta',
    cta: 'Pansik Penau Percuma',
    menu: 'Menu',
    close: 'Tutup',
  },
  strip: {
    text: 'Pemansik Profil Diatu Dibuka — Konsultasi Keterubah Percuma',
    cta: 'Pansik Diatu →',
  },
  hero: {
    eyebrow: 'Program Khas Ke Sida Bedagang & Tuai Gerempung',
    headline1: 'SPM Ngagai Diploma.',
    headline2: 'Enda Ibuh Badu Bekereja. Enda Ibuh Berengkah Ari Puchuk.',
    support:
      'Pengalaman dagang enggau pengalaman nyadi tuai nuan dipansik nengah jalai ofisial Diploma Kemahiran Malaysia — sijil ari Jabatan Pembangunan Kemahiran (JPK), Kementerian Sumber Manusia Malaysia. Belajar sambil bekereja, diberi ajar ari pun datai ke penilai.',
    badges: ['Bepelasarka pengalaman amat', 'Ajar portfolio', 'Jalai fleksibel', 'Penyedia penilai'],
    ctaPrimary: 'Pansik Penau Percuma',
    ctaSecondary: 'Terokai Dua Jalai',
    ctaMicrocopy: 'Pemansik keterubah percuma. Nadai komitmen. Semina ngambi maya kira 60 saat.',
    card: {
      title: 'Ari Pengalaman Ngagai Jalai Kelulusan',
      steps: ['Pemansik pengalaman', 'Pemilih jalai', 'Ajar portfolio', 'Penyedia penilai'],
      cta: 'Berengkah Pansik Keterubah →',
    },
    trust: 'Team SPM2Diploma di baruh KOBIS Berhad deka bejalai enggau nuan sepemanjai pejalai tu.',
  },
  experience: {
    label: 'PENGALAMAN NUAN PATUT DIIKTIRAF',
    title: 'Pengalaman Nuan Teguh. Tang Kati Kelulusan Nuan Nunjukka Nya?',
    intro:
      'Mayuh sida bedagang enggau tuai gerempung udah nirika dagang, ngemata raban, nyadi tuai projek sereta mutarka penanggul amat bertaun-taun. Tang enti nadai kelulusan formal ti sebaka, sekeda peluang profesional engka agi tusah diulih.',
    items: [
      'Bertaun-taun ngumpul pengalaman amat',
      'Bisi tanggungpengawa kereja enggau ruang bilik',
      'Deka ngemansangka pengarap profesional',
      'Deka ngeringka kredibiliti',
      'Deka nyusun pengalaman nyadi portfolio',
      'Deka meretika jalai kelulusan ti ngena',
    ],
  },
  credStrip: [
    'Program diuruska KOBIS Berhad',
    'Diberi ajar magang Team SPM2Diploma',
    'Jalai bepelasarka pengalaman enggau bukti kompetensi',
    'Chara penilai formal diperlu',
    'Enda ibuh ninggalka pengawa tauka dagang',
  ],
  pathways: {
    title: 'Pilih Jalai Nuan',
    intro: 'Dua jalai Diploma. Siti ke sida bedagang, siti ke tuai gerempung.',
    card1: {
      name: 'Diploma Kemahiran Keusahawanan',
      levelNote: 'Sijil ari Jabatan Pembangunan Kemahiran (JPK) — Kementerian Sumber Manusia Malaysia',
      for: ['Empu dagang', 'Sida bedagang', 'Pengurus dagang'],
      forTitle: 'Ngena ke:',
      message:
        'Nuan udah bertaun-taun nirika dagang. Diatu tau maya ngeringka pengalaman nya enggau kelulusan ti tinggi agi.',
      cta: 'Terokai Jalai Keusahawanan',
      expTitle: 'Bidang pengalaman ti engka bekaul:',
      expAreas: [
        'Operasyen dagang',
        'Pemasaran enggau jualan',
        'Pengurus wang',
        'Pengurus pelanggan',
        'Ngemata raban',
        'Perancang dagang',
      ],
    },
    card2: {
      name: 'Diploma Lanjutan Kepimpinan & Pentadbiran Organisasi',
      levelNote: 'Sijil ari Jabatan Pembangunan Kemahiran (JPK) — Kementerian Sumber Manusia Malaysia',
      for: [
        'Tuai NGO',
        'Tuai koperasi',
        'Tuai persatuan',
        'Perunding',
        'Pentadbir gerempung',
        'Eksekutif kanan',
      ],
      forTitle: 'Ngena ke:',
      message:
        'Nuan udah nyadi tuai ke orang, projek enggau gerempung. Diatu mai pengalaman nuan ngagai tikas ti tinggi agi.',
      cta: 'Terokai Jalai Kepimpinan',
      expTitle: 'Bidang pengalaman ti engka bekaul:',
      expAreas: [
        'Nyadi tuai gerempung',
        'Tadbir urus',
        'Penyelaras projek',
        'Pentadbiran',
        'Pengurus pihak berkepentingan',
        'Nyadi tuai raban',
      ],
    },
    unsure: {
      question: 'Enda tentu jalai ni ti ngena?',
      cta: 'Awakka Team Kami Nulung Nilai Profil Nuan',
    },
  },
  receive: {
    title: 'Nama Deka Diterima Nuan',
    intro: 'Pejalai ti tesusun — nuan nemu enggau terang nama ti disediaka ke nuan.',
    items: [
      { title: 'Pemansik Profil Keterubah', body: 'Penilai keterubah ngagai pengalaman, latar enggau juluk ati nuan.' },
      { title: 'Saran Jalai Ti Ngena', body: 'Team nulung ngelala jalai ti pemadu bekaul.' },
      { title: 'Latih enggau Ajar', body: 'Sesi ajar ti tesusun kena nulung peserta meretika pejalai program.' },
      { title: 'Ajar Portfolio', body: 'Tulung nyusun pengalaman enggau bukti ti bekaul enggau chara ti teratur agi.' },
      { title: 'Senarai Pemeriksa Bukti', body: 'Ajar pasal dokumen enggau bukti ti engka diperlu.' },
      { title: 'Penyedia Penilai', body: 'Ajar kena nulung peserta sedia napi chara penilai.' },
      { title: 'Participant Progress Portal', body: 'Senarai pemeriksa enggau pemansang pejalai peserta ba siti endur.' },
      { title: 'Sokong Team SPM2Diploma', body: 'Tulung nengah team program enggau WhatsApp ofisial.' },
    ],
  },
  midCta: {
    title: 'Enda Tentu Kati Pengalaman Nuan Ngena?',
    body: 'Nuan enda ibuh mutuska kediri. Tembuka pansik keterubah percuma lalu Team SPM2Diploma deka nulung ngelala jalai ti ngena agi.',
    ctaPrimary: 'Pansik Penau Dalam 60 Saat',
    ctaWhatsapp: 'Tanya Nengah WhatsApp',
  },
  official: {
    title: 'Baka Ni Jalai Tu Bejalai Enggau Ofisial',
    points: [
      'Pengalaman bekaul nuan dipansik dulu.',
      'Peserta engka begunaka bukti pengalaman.',
      'Penyedia portfolio engka diperlu.',
      'Latih enggau ajar engka diperlu.',
      'Chara penilai formal dikena.',
      'Penyertaan enda nanggung pensijilan otomatik.',
      'Pensijilan bepanggai ba keperluan kompetensi enggau penilai ti ditetapka.',
    ],
    pendingNote:
      '[BM] Maklumat rasmi kelayakan, NOSS dan rakan penilaian sedang melalui proses pengesahan akhir. Maklumat yang disahkan akan diterangkan kepada pemohon semasa sesi semakan profil.',
  },
  transform: {
    title: 'Bayangka Penuduk Nuan Udah Nembuka Pejalai Tu',
    items: [
      'Pengalaman nuan tesusun agi lalu ulih dipandangka enggau chara profesional.',
      'Nuan meretika agi penguna kompetensi ti udah digaga.',
      'Profil profesional nuan nyadi teguh agi.',
      'Nuan yakin agi dalam pengawa dagang tauka nyadi tuai.',
      'Nuan bisi jalai ti terang agi ke pemansang ila.',
      'Pencapai nuan ulih nyadi pengaga ati diri enggau ruang bilik.',
    ],
    disclaimer:
      '[BM] Setiap peserta mempunyai perjalanan dan hasil yang berbeza. Kelayakan akhir bergantung kepada pengalaman, bukti kompetensi, komitmen dan proses penilaian.',
  },
  urgency: {
    title: 'Pemansik Profil Ke Pengambi Ti Deka Datai Diatu Dibuka',
    body: 'Genap profil enda tau enda dipansik dulu kena nentuka penyesuai jalai enggau penyedia peserta. Tembuka pansik keterubah ngambika team kami ulih nulung nuan meretika pengelangkah siti agi.',
    cta: 'Minta Pemansik Keterubah Percuma',
    responsePromise: 'Team deka ngangau nuan nengah WhatsApp dalam sehari bekereja.',
  },
  quick: {
    title: 'Pansik Penau Percuma',
    subtitle: 'Kira 60 saat aja. Nadai komitmen. Team deka ngangau nuan nengah WhatsApp.',
    qPathway: 'Jalai ni ti dikedekaka nuan?',
    pathwayOptions: {
      keusahawanan: 'Keusahawanan',
      kepimpinan: 'Kepimpinan & Pentadbiran Gerempung',
      unsure: 'Apin tentu',
    },
    qYears: 'Berapa taun pengalaman bekaul nuan?',
    yearsOptions: ['Kurang 3 taun', '3–5 taun', '6–10 taun', 'Lebih 10 taun'],
    qQualification: 'Kelulusan pemadu tinggi',
    qualificationOptions: ['SPM', 'STPM / STAM', 'Sijil', 'Diploma', 'Bukai'],
    qName: 'Nama penuh',
    qPhone: 'Nombor WhatsApp',
    qLang: 'Jaku dipilih',
    langOptions: ['BM', 'EN', '中文', 'Iban'],
    consent:
      'Aku setuju Team SPM2Diploma ngangau aku nengah WhatsApp pasal pemansik keterubah tu. Penerang aku deka dikemataka nitihka Notis Privasi.',
    submit: 'Anjung Ke Pemansik Percuma',
    submitting: 'Benung nganjung…',
    confirmTitle: 'Pemansik Keterubah Nuan Udah Diterima',
    confirmBody:
      'Team SPM2Diploma deka mansik profil keterubah nuan lalu ngangau nuan nengah WhatsApp dalam sehari bekereja.',
    statusPartial: 'Profil Keterubah Diterima — Apin Tembu',
    statusComplete: 'Profil Tembu Diterima',
    btnContinue: 'Terus Profil Penuh',
    btnLater: 'Sambung Ila',
    btnWhatsapp: 'WhatsApp Team Diatu',
    continueNote:
      'Nembuka profil penuh (5–8 minit) nulung team mansik jalai nuan enggau tepat agi. Nuan mega ulih nembuka iya ila.',
  },
  outcomes: {
    title: 'Nama Ulih Berubah Ke Nuan?',
    note: 'Genap pejalai enda sebaka. Asil bepanggai ba latar, komitmen enggau chara penilai.',
    items: [
      { title: 'Pengarap profesional', body: 'Ulih ngeringka pengarap diri ba pengawa nuan.' },
      { title: 'Kredibiliti', body: 'Ulih nyukung kredibiliti nuan ba mata pelanggan enggau kaban.' },
      { title: 'Penuduk diri', body: 'Nulung ngemanahka penuduk profesional nuan.' },
      { title: 'Penuduk tuai', body: 'Ulih ngeringka penuduk nuan dalam gerempung.' },
      { title: 'Jalai kelulusan', body: 'Nyediaka jalai pemansang kelulusan ti formal.' },
      { title: 'Peluang ila', body: 'Muka peluang baru ke pagila nuan.' },
      { title: 'Pengaga ati', body: 'Pengaga ati diri empu enggau ruang bilik.' },
    ],
  },
  coach: {
    title: 'You Bring the Experience. We Guide the Journey.',
    subtitle: 'Coach Roszie & Team SPM2Diploma',
    roles: ['Operating Partner', 'Lead Trainer', 'Penemuai peserta'],
    teamNote: 'Team SPM2Diploma di baruh KOBIS Berhad',
    trust:
      'Coach Roszie and the SPM2Diploma Team under KOBIS Berhad will be together with you throughout this journey.',
    trustMs:
      'Nuan enda ibuh bejalai kediri. Coach Roszie enggau Team SPM2Diploma di baruh KOBIS Berhad deka nulung, meri ajar sereta bejalai enggau nuan ari pemansik keterubah datai ke nuan sedia napi chara penilai.',
    photoPlaceholder: 'Gambar ofisial Coach Roszie',
    videoPlaceholder: 'Video pengenal (deka diudah)',
    teamCard: {
      title: 'Team SPM2Diploma di baruh KOBIS Berhad',
      body: 'Team program ti bededikasi nyokong komunikasi peserta, penyedia dokumen, penyelaras latih enggau pemantau pemansang.',
    },
    whatsappCta: 'Kangau Team ba WhatsApp',
  },
  suitability: {
    title: 'Kati Pejalai Tu Ngena Ke Nuan?',
    statement:
      '[BM — nganti terjemahan Iban disahka] Program ini bukan jalan pintas mendapatkan Diploma. Ia merupakan perjalanan dibimbing yang memerlukan pengalaman sebenar, komitmen dan proses penilaian.',
    items: [
      'Bisi pengalaman amat ti bekaul',
      'Serius deka bulih kelulusan tinggi agi',
      'Sedia nyendiaka bukti pengalaman',
      'Ulih komited ngagai ajar enggau penilai',
      'Sabar enggau chara ti betul',
      'Sedia ari sukut wang',
      'Deka diberi ajar, ukai jalai pintas',
    ],
  },
  journey: {
    title: 'Pejalai Nuan Enggau Kami',
    intro: 'Lapan pengelangkah ti terang, diberi ajar ari pun datai ke ujung.',
    steps: [
      { title: 'Pansik Penau', body: 'Padahka pengalaman enggau latar nuan.' },
      { title: 'Team Mansik Profil Nuan', body: 'Team program nilai jalai ti ngena ke nuan.' },
      { title: 'Berandau Pasal Jalai Ti Ngena', body: 'Randau kediri pasal jalai nuan.' },
      { title: 'Tembuka Pendaftar', body: 'Tembuka pendaftar program ti ofisial.' },
      { title: 'Enggau Latih & Ajar', body: 'Latih enggau ajar enggau team.' },
      { title: 'Sediaka Portfolio & Bukti', body: 'Gaga portfolio enggau iring ajar.' },
      { title: 'Sedia Ke Penilai', body: 'Penyedia ti manah napi penilai.' },
      { title: 'Tembuka Chara Penilai', body: 'Nengah chara penilai ti udah ditetapka.' },
    ],
  },
  credibility: {
    title: 'Kredibiliti Program',
    intro:
      'Program tu bepelasarka sistem Kelulusan Kemahiran Malaysia. Belajar mayuh agi pasal struktur ofisial di belakang jalai tu.',
    items: [
      {
        q: 'Nama Sistem Persijilan Kemahiran Malaysia?',
        a: '[BM — nganti terjemahan Iban disahka] Sistem Persijilan Kemahiran Malaysia diuruskan oleh Jabatan Pembangunan Kemahiran (JPK). Ia mengiktiraf kompetensi berasaskan standard pekerjaan kebangsaan.',
      },
      {
        q: 'Nama NOSS?',
        a: '[BM — nganti terjemahan Iban disahka] NOSS (National Occupational Skills Standard) ialah standard kemahiran pekerjaan kebangsaan yang menjadi asas kepada setiap kelayakan kemahiran di Malaysia.',
      },
      {
        q: 'Nama DKM Tahap 4?',
        a: '[BM — nganti terjemahan Iban disahka] Diploma Kemahiran Malaysia (DKM) Tahap 4 ialah kelayakan kemahiran peringkat diploma dalam sistem Kelayakan Kemahiran Malaysia.',
      },
      {
        q: 'Nama DLKM Tahap 5?',
        a: '[BM — nganti terjemahan Iban disahka] Diploma Lanjutan Kemahiran Malaysia (DLKM) Tahap 5 ialah kelayakan kemahiran lanjutan, satu tahap lebih tinggi daripada DKM.',
      },
      {
        q: 'Baka ni chara penilai dipejalaika?',
        a: '[BM — nganti terjemahan Iban disahka] Penilaian berasaskan kompetensi, termasuk portfolio dan bukti pengalaman sebenar, mengikut proses yang ditetapkan oleh keperluan rasmi program.',
      },
    ],
    disclaimer:
      '[BM] Maklumat rasmi program, nama kelayakan dan rujukan NOSS adalah tertakluk kepada pengesahan akhir.',
  },
  faq: {
    title: 'Tanya Suah Ditanya',
    items: [
      {
        q: 'Aku semina bisi SPM. Kati aku ulih minta?',
        a: '[BM — nganti terjemahan Iban disahka] Pemegang SPM yang mempunyai pengalaman berkaitan dialu-alukan untuk menjalani semakan profil. Kelayakan akhir tertakluk kepada latar belakang, pengalaman, bukti kompetensi dan keperluan rasmi program.',
      },
      {
        q: 'Kati pengalaman diperlu?',
        a: 'Au. Program tu digaga khas ke sida ti bisi pengalaman amat dalam dagang tauka pengawa nyadi tuai gerempung. Pengalaman nuan nya pelasar pejalai tu.',
      },
      {
        q: 'Kati aku ulih terus bekereja tauka bedagang?',
        a: 'Au. Jalai tu digaga ke sida ti agi bekereja, bedagang tauka megai tanggungpengawa gerempung.',
      },
      {
        q: 'Berapa lama chara tu?',
        a: '[BM — nganti terjemahan Iban disahka] Program merangkumi latihan, bimbingan portfolio dan persediaan penilaian. Tempoh sebenar tertakluk kepada kesiapsiagaan peserta, keperluan portfolio dan jadual penilaian.',
      },
      {
        q: 'Kati kelulusan tu diiktiraf?',
        a: '[BM — nganti terjemahan Iban disahka] Program ini berlandaskan sistem Kelayakan Kemahiran Malaysia di bawah JPK. Maklumat rasmi kelayakan akan disahkan dan dikongsikan semasa sesi penerangan. [Untuk pengesahan rasmi]',
      },
      {
        q: 'Nama DKM enggau DLKM?',
        a: '[BM — nganti terjemahan Iban disahka] DKM ialah Diploma Kemahiran Malaysia (Tahap 4) dan DLKM ialah Diploma Lanjutan Kemahiran Malaysia (Tahap 5) dalam sistem Kelayakan Kemahiran Malaysia.',
      },
      {
        q: 'Nama NOSS?',
        a: '[BM — nganti terjemahan Iban disahka] NOSS (National Occupational Skills Standard) ialah standard kemahiran pekerjaan kebangsaan yang menjadi asas kelayakan kemahiran di Malaysia.',
      },
      {
        q: 'Kati aku tetap bulih Diploma?',
        a: '[BM — nganti terjemahan Iban disahka] Tidak. Penyertaan program tidak menjamin pensijilan secara automatik. Peserta perlu melengkapkan keperluan program dan disahkan kompeten melalui proses penilaian yang ditetapkan.',
      },
      {
        q: 'Kati portfolio diperlu?',
        a: 'Au. Portfolio enggau bukti pengalaman nya bagi ti beguna dalam chara penilai. Team deka meri ajar sepanjai penyedia.',
      },
      {
        q: 'Nama bukti ti engka diperlu?',
        a: '[BM — nganti terjemahan Iban disahka] Antaranya: pendaftaran perniagaan atau organisasi, profil syarikat, laporan projek, minit mesyuarat, rekod kewangan atau operasi, bahan pemasaran, rekod kakitangan, gambar, video dan sijil berkaitan.',
      },
      {
        q: 'Berapa yuran program?',
        a: '[BM — nganti terjemahan Iban disahka] Yuran bergantung pada laluan dan keperluan peserta. Maklumat lengkap mengenai yuran, jadual dan pilihan bayaran akan diterangkan selepas semakan profil awal. Tiada bayaran diperlukan untuk semakan awal.',
      },
      {
        q: 'Kati bayar ulih digaga betingkat?',
        a: '[BM — nganti terjemahan Iban disahka] Maklumat mengenai struktur bayaran akan dikongsikan semasa sesi penerangan. [Untuk pengesahan rasmi]',
      },
      {
        q: 'Kati aku ulih ngiga penaja?',
        a: 'Ulih. Nuan ulih madahka diri benung ngiga penaja dalam borang pansik penau. Team deka berandau enggau nuan pasal pilih ti bisi.',
      },
      {
        q: 'Sapa deka meri aku ajar?',
        a: 'Coach Roszie enggau Team SPM2Diploma di baruh KOBIS Berhad deka nulung, meri ajar sereta bejalai enggau nuan ari pemansik keterubah datai ke nuan sedia napi chara penilai.',
      },
      {
        q: 'Kati kelas dipejalaika fizikal, online tauka hybrid?',
        a: '[BM — nganti terjemahan Iban disahka] Kaedah latihan dan bimbingan akan diterangkan semasa sesi penerangan mengikut laluan dan kumpulan pengambilan. [Untuk pengesahan rasmi]',
      },
      {
        q: 'Nama nyadi udah pansik penau?',
        a: 'Team deka mansik profil keterubah nuan lalu ngangau nuan nengah WhatsApp dalam sehari bekereja kena berandau pasal jalai ti ngena enggau pengelangkah siti agi.',
      },
      {
        q: 'Sapa badan ti ngeluarka kelulusan?',
        a: '[BM — nganti terjemahan Iban disahka] Maklumat rasmi kelayakan, NOSS dan rakan penilaian sedang melalui proses pengesahan akhir. Maklumat yang disahkan akan diterangkan kepada pemohon semasa sesi semakan profil.',
      },
      {
        q: 'Nama pengawa KOBIS Berhad?',
        a: 'KOBIS Berhad ngemataka strategi program, pemasaran, penyelaras pemohon, platform digital enggau pentadbiran program. Coach Roszie enggau team program ngemataka ajar enggau sokong peserta.',
      },
      {
        q: 'Baka ni data diri aku dikemataka?',
        a: 'Penerang nuan disimpan enggau selamat, semina diakses team ti diberi kuasa, lalu dikemataka nitihka Notis Privasi. Penerang nuan enda dijual tauka dikongsi ke pemasaran pihak ketiga.',
      },
    ],
  },
  finalCta: {
    headline1: 'Pengalaman Nuan Udah Mai Nuan Datai Ditu.',
    headline2: 'Diatu Mai Iya Ngagai Tikas Ti Tinggi Agi.',
    cta: 'Pansik Penau Aku',
    trust: 'Team SPM2Diploma di baruh KOBIS Berhad deka bejalai enggau nuan sepemanjai pejalai tu.',
  },
  form: {
    title: 'Pansik Penau SPM2Diploma',
    support:
      'Padahka mimit pasal pengalaman nuan. Team SPM2Diploma deka mansik penerang nuan lalu nulung milih jalai ti ngena.',
    stepLabel: 'Pengelangkah',
    of: 'ari',
    next: 'Pengelangkah Siti Agi',
    back: 'Pulai',
    submit: 'Anjung Pansik Penau',
    submitting: 'Benung nganjung…',
    estTime: 'Anggar maya: 5–8 minit',
    steps: {
      pathway: {
        title: 'Pilih Jalai Nuan',
        options: {
          keusahawanan: 'Diploma Kemahiran Keusahawanan',
          kepimpinan: 'Diploma Lanjutan Kepimpinan & Pentadbiran Organisasi',
          unsure: 'Aku apin tentu',
        },
      },
      personal: {
        title: 'Penerang Diri',
        fullName: 'Nama penuh',
        ageRange: 'Umur',
        ageOptions: ['25–34', '35–44', '45–54', '55 ke atas'],
        location: 'Endur diau (nengeri / menua)',
        phone: 'Nombor WhatsApp',
        email: 'E-mel',
        qualification: 'Kelulusan pemadu tinggi',
        qualificationOptions: ['SPM', 'STPM / STAM', 'Sijil', 'Diploma', 'Bukai'],
      },
      experience: {
        titleBusiness: 'Pengalaman Dagang Nuan',
        titleLeadership: 'Pengalaman Nyadi Tuai',
        titleUnsure: 'Pengalaman Nuan',
        unsureNote: 'Padahka pengalaman ti pemadu bekaul — dagang tauka nyadi tuai gerempung.',
        businessName: 'Nama dagang',
        industry: 'Industri',
        yearsBusiness: 'Berapa taun bedagang',
        currentRole: 'Pengawa diatu',
        teamSize: 'Pemesai raban',
        products: 'Produk / servis utama',
        responsibilities: 'Tanggungpengawa utama',
        website: 'Laman web / pautan sosial dagang (enti bisi)',
        orgName: 'Nama gerempung',
        orgType: 'Bansa gerempung',
        orgTypeOptions: [
          'NGO',
          'Koperasi',
          'Persatuan',
          'Yayasan',
          'Gerempung komuniti',
          'Kompeni / korporat',
          'Perunding',
          'Bukai',
        ],
        position: 'Penuduk diatu',
        yearsLeadership: 'Berapa taun nyadi tuai',
        orgTeamSize: 'Pemesai raban / jawatankuasa / sukarelawan',
        orgResponsibilities: 'Tanggungpengawa utama',
        orgWebsite: 'Laman web / pautan sosial gerempung (enti bisi)',
        yearsOptions: ['1–2 taun', '3–5 taun', '6–10 taun', 'Lebih 10 taun'],
      },
      evidence: {
        title: 'Penyedia Bukti',
        intro:
          'Ari ti dibaruh, ni ti engka dikemisi nuan? (Tanda semua ti bekaul — dokumen ENDA ibuh dianjung diatu.)',
        note: 'Dokumen deka dipinta dudi ila nengah chara sokong peserta ti biasa.',
        options: [
          'Pendaftar dagang tauka gerempung',
          'Profil kompeni / gerempung',
          'Repot projek',
          'Minit aum',
          'Rekod wang tauka operasyen',
          'Utai pemasaran',
          'Rekod pengereja pengawa tauka gerempung',
          'Gambar tauka video',
          'Sijil ti bekaul',
          'Bukti sokong bukai',
        ],
      },
      commitment: {
        title: 'Komitmen Nuan',
        question:
          '[BM — nganti terjemahan Iban disahka] Program ini memerlukan komitmen terhadap sesi bimbingan, penyediaan portfolio dan proses penilaian. Adakah anda bersedia memberikan komitmen yang diperlukan?',
        options: ['Au, aku sedia', 'Aku begunaka penerang mayuh agi', 'Apin sedia diatu'],
      },
      financial: {
        title: 'Penyedia Wang',
        question:
          '[BM — nganti terjemahan Iban disahka] Sekiranya profil anda sesuai, adakah anda bersedia membuat pelaburan kewangan untuk mengikuti keseluruhan program?',
        options: [
          'Au, aku sedia',
          'Aku deka meda struktur bayar dulu',
          'Aku benung ngiga penaja',
          'Apin sedia ari sukut wang',
        ],
      },
      motivation: {
        title: 'Kebuah Nuan',
        question: 'Nama kebuah utama nuan deka bulih Diploma?',
        options: [
          'Ningkatka kelulusan',
          'Ngeringka pengarap',
          'Pemansang karier',
          'Kredibiliti dagang',
          'Nyadi tuai gerempung',
          'Peluang ila',
          'Pengaga ati diri enggau ruang bilik',
          'Bukai',
        ],
        otherLabel: 'Padahka mayuh agi (pilih)',
        otherPlaceholder: 'Padahka kebuah nuan…',
      },
    },
    consent: {
      title: 'Penyetuju',
      review: 'Aku setuju penerang ti dianjung dipansik Team SPM2Diploma.',
      contact: 'Aku setuju dikangau pasal program tu.',
      storage: 'Aku setuju penerang aku disimpan enggau selamat.',
      privacy: 'Aku udah macha lalu nerima Notis Privasi.',
      privacyLink: 'Bacha Notis Privasi',
    },
    validation: {
      required: 'Ruang tu diperlu',
      selectOne: 'Pilih siti',
      invalidEmail: 'Isi e-mel ti betul',
      invalidPhone: 'Isi nombor telefon ti betul',
      consentRequired: 'Penyetuju diperlu kena neruska',
      fixErrors: 'Tembuka dulu ruang ti ditanda sebedau neruska.',
    },
  },
  confirmation: {
    title: 'Terima kasih. Penerang nuan udah diterima.',
    support:
      'Coach Roszie enggau Team SPM2Diploma di baruh KOBIS Berhad deka mansik profil nuan lalu ngangau nuan kena nerangka pengelangkah siti agi.',
    refLabel: 'Rujukan pemohon',
    pathwayLabel: 'Jalai dipilih',
    dateLabel: 'Tarikh dianjung',
    nextTitle: 'Nama nyadi udah tu?',
    nextSteps: [
      'Team mansik profil nuan dalam sekeda hari bekereja.',
      'Nuan deka dikangau nengah WhatsApp tauka telefon.',
      'Jalai ti ngena deka dirandauka enggau nuan.',
    ],
    docsTitle: 'Dokumen ti dikelalu disediaka',
    docs: [
      'Salin kad pengenal',
      'Pendaftar dagang / gerempung (enti bisi)',
      'Sampel bukti pengalaman (repot, gambar, rekod)',
    ],
    whatsappCta: 'Terus ba WhatsApp',
    whatsappNote: 'Bisi tanya beguna? Kangau terus Team SPM2Diploma.',
    unsurePathway: 'Apin tentu (deka dirandauka)',
    backHome: 'Pulai ke Lambar Keterubah',
  },
  participant: {
    loginTitle: 'Log Masuk Peserta',
    loginSupport: 'Peda status pemohon, pemansang enggau senarai pemeriksa nuan.',
    email: 'E-mel',
    password: 'Kata laluan',
    login: 'Log Masuk',
    loggingIn: 'Benung log masuk…',
    loginError: 'E-mel tauka kata laluan salah.',
    logout: 'Log Keluar',
    welcome: 'Selamat datai',
    refLabel: 'Rujukan pemohon',
    pathwayLabel: 'Jalai nuan',
    statusLabel: 'Status diatu',
    progressTitle: 'Pemansang Pejalai Nuan',
    checklistTitle: 'Senarai Pemeriksa Nuan',
    nextActionTitle: 'Pengawa Siti Agi',
    updatesTitle: 'Berita Program',
    noUpdates: 'Nadai berita baru diatu.',
    trainingLabel: 'Tarikh latih',
    trainingTBA: 'Deka dipadahka',
    contactTitle: 'Kangau Team Nuan',
    whatsappSupport: 'Sokong WhatsApp',
    stages: {
      application_received: 'Pemohon Diterima',
      profile_review: 'Pemansik Profil',
      pathway_confirmation: 'Pengesah Jalai',
      registration: 'Pendaftar',
      training_guidance: 'Latih & Ajar',
      portfolio_preparation: 'Penyedia Portfolio',
      assessment_preparation: 'Penyedia Penilai',
      completion: 'Tembu',
    },
    checklist: {
      personal_details: 'Penerang diri tembu',
      pathway_selected: 'Jalai udah dipilih',
      briefing_completed: 'Sesi penerang program tembu',
      registration_completed: 'Pendaftar tembu',
      documents_prepared: 'Dokumen diperlu udah disediaka',
      training_attended: 'Udah datai ba latih',
      portfolio_in_progress: 'Portfolio benung digaga',
      ready_for_assessment: 'Sedia ke penilai',
    },
  },
  footer: {
    publicTitle: 'SPM2Diploma',
    publicLinks: {
      pathways: 'Dua Jalai',
      journey: 'Pejalai Nuan',
      coach: 'Coach & Team',
      faq: 'Tanya Suah Ditanya',
      semak: 'Pansik Penau',
      contact: 'Kangau Kami',
      privacy: 'Notis Privasi',
      programInfo: 'Penerang Beguna Program',
    },
    supportTitle: 'Sokong Peserta',
    participantLogin: 'Log Masuk Peserta',
    whatsappSupport: 'Sokong WhatsApp',
    internalTitle: 'Akses Dalam',
    teamAccess: 'Team Access',
    managementAccess: 'Management Access',
    signature: 'SPM2Diploma is an initiative managed by KOBIS Berhad.',
    poweredBy: 'Powered and managed by',
    copyright: '© 2026 KOBIS Berhad. All Rights Reserved.',
  },
  floating: {
    whatsappLabel: 'WhatsApp Team SPM2Diploma',
    officerTitle: 'Pemantu Digital',
    officerIntro:
      'Salam! Aku ulih nulung nyaut tanya pasal Program SPM2Diploma. Pilih tanya dibaruh:',
    officerNote:
      'Ke pansik penau enggau penerang ofisial, Team SPM2Diploma deka nulung nuan kediri.',
    shortcuts: [
      {
        q: 'Kati aku layak enti semina bisi SPM?',
        a: '[BM — nganti terjemahan Iban disahka] Pemegang SPM yang mempunyai pengalaman berkaitan dialu-alukan untuk menjalani semakan profil. Kelayakan akhir tertakluk kepada latar belakang, pengalaman, bukti kompetensi dan keperluan rasmi program.',
      },
      {
        q: 'Jalai ni ti ngena ke aku?',
        a: 'Jalai Keusahawanan ngena ke empu enggau pengurus dagang. Jalai Kepimpinan ngena ke tuai NGO, koperasi, persatuan enggau pentadbir gerempung. Enti enda tentu, anjung pansik keterubah lalu team deka nulung nilai profil nuan.',
      },
      {
        q: 'Berapa lama chara tu?',
        a: 'Maya ti amat bepanggai ba penyedia peserta, keperluan portfolio enggau jadual penilai. Team deka nerangka anggar maya sesi pemansik profil.',
      },
      {
        q: 'Nama bukti pengalaman ti diperlu?',
        a: 'Chunto: pendaftar dagang tauka gerempung, profil kompeni, repot projek, minit aum, rekod wang tauka operasyen, gambar enggau sijil bekaul. Dokumen enda ibuh dianjung maya pansik keterubah.',
      },
      {
        q: 'Berapa yuran program?',
        a: 'Yuran bepanggai ba jalai enggau keperluan peserta. Penerang penuh deka diterangka udah pemansik profil keterubah. Nadai bayar diperlu ke pansik keterubah.',
      },
      {
        q: 'Ulih terus bekereja?',
        a: 'Au. Jalai tu digaga ke sida ti agi bekereja, bedagang tauka megai tanggungpengawa gerempung.',
      },
      {
        q: 'Nama nyadi udah aku nganjung pansik?',
        a: 'Team deka mansik profil keterubah nuan lalu ngangau nuan nengah WhatsApp dalam sehari bekereja kena nerangka pengelangkah siti agi.',
      },
    ],
    primaryCta: 'Berengkah Pansik Keterubah Percuma',
    askTeam: 'Tanya Team ba WhatsApp',
  },
  privacy: {
    title: 'Notis Privasi',
    body: [
      '[BM — nganti terjemahan Iban disahka] Maklumat yang anda hantar melalui borang Semakan Kelayakan digunakan untuk menyemak profil anda, menghubungi anda berkaitan program dan menguruskan penyertaan anda dalam Program SPM2Diploma.',
      '[BM] Maklumat anda disimpan dengan selamat dan hanya diakses oleh Team SPM2Diploma dan KOBIS Berhad yang diberi kuasa. Maklumat anda tidak akan dijual atau dikongsikan kepada pihak ketiga untuk tujuan pemasaran.',
      '[BM] Anda boleh menghubungi kami melalui WhatsApp untuk sebarang pertanyaan mengenai maklumat peribadi anda.',
      '[Notis privasi penuh akan dikemas kini — untuk pengesahan KOBIS Berhad]',
    ],
  },
  programInfo: {
    title: 'Penerang Beguna Program',
    body: [
      '[BM — nganti terjemahan Iban disahka] Pemegang SPM yang mempunyai pengalaman berkaitan dialu-alukan untuk menjalani semakan profil. Kelayakan akhir tertakluk kepada latar belakang, pengalaman, bukti kompetensi dan keperluan rasmi program.',
      '[BM] Program merangkumi latihan, bimbingan portfolio dan persediaan penilaian. Tempoh sebenar tertakluk kepada kesiapsiagaan peserta, keperluan portfolio dan jadual penilaian.',
      '[BM] Penyertaan program tidak menjamin pensijilan secara automatik. Peserta perlu melengkapkan keperluan program dan disahkan kompeten melalui proses penilaian yang ditetapkan.',
      '[BM] Nama rasmi kelayakan dan rujukan NOSS adalah tertakluk kepada pengesahan akhir dan akan dikemas kini dari semasa ke semasa.',
    ],
  },
  seo: {
    home: {
      title: 'SPM2Diploma | Jalai Diploma Ke Sida Bedagang & Tuai Gerempung — KOBIS Berhad',
      desc: 'Jalai diberi ajar ke sida bedagang enggau tuai gerempung mai pengalaman amat ngagai kelulusan tinggi agi. Pansik keterubah percuma 60 saat.',
    },
    pathway1: {
      title: 'Jalai Keusahawanan | SPM2Diploma',
      desc: 'Jalai Diploma Kemahiran Keusahawanan ke empu dagang, sida bedagang enggau pengurus dagang bepengalaman.',
    },
    pathway2: {
      title: 'Jalai Kepimpinan & Pentadbiran Gerempung | SPM2Diploma',
      desc: 'Jalai Diploma Lanjutan Kepimpinan ke tuai NGO, koperasi, persatuan enggau pentadbir gerempung.',
    },
    semakan: {
      title: 'Pansik Penau Percuma | SPM2Diploma',
      desc: 'Pansik keterubah percuma 60 saat. Team SPM2Diploma deka ngangau nuan nengah WhatsApp dalam sehari bekereja.',
    },
    login: { title: 'Log Masuk Peserta | SPM2Diploma', desc: 'Peda status pemohon, pemansang enggau senarai pemeriksa nuan.' },
    privacy: { title: 'Notis Privasi | SPM2Diploma', desc: 'Baka ni penerang diri nuan dikemataka SPM2Diploma enggau KOBIS Berhad.' },
    programInfo: { title: 'Penerang Beguna Program | SPM2Diploma', desc: 'Penerang beguna pasal chara, penilai enggau pensijilan Program SPM2Diploma.' },
  },
  notFound: {
    title: 'Lambar Enda Ditemu',
    body: 'Lambar ti digiga nuan nadai tauka udah dipindahka.',
    cta: 'Pulai ke Lambar Keterubah',
  },
  common: {
    loading: 'Benung dibuka…',
    error: 'Minta ampun, bisi penyalah. Uji baru.',
    pendingConfirmation: 'Nganti pengesah ofisial',
    demoNotice: 'Mod demo — data enda disimpan tetap.',
  },
}
