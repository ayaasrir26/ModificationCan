export interface Player {
    id: string;
    name: string;
    photoUrl: string;
    position: 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Forward';
    teamCode: string;
}

export const players: Player[] = [
    // Morocco (MAR)
    { id: 'mar-1', name: 'Yassine Bounou', photoUrl: 'https://img.a.transfermarkt.technology/portrait/header/207597-1661351111.jpg', position: 'Goalkeeper', teamCode: 'MAR' },
    { id: 'mar-2', name: 'Achraf Hakimi', photoUrl: 'https://img.a.transfermarkt.technology/portrait/header/398073-1668417757.jpg', position: 'Defender', teamCode: 'MAR' },
    { id: 'mar-3', name: 'Nayef Aguerd', photoUrl: 'https://img.a.transfermarkt.technology/portrait/header/361914-1658411036.jpg', position: 'Defender', teamCode: 'MAR' },
    { id: 'mar-4', name: 'Sofyan Amrabat', photoUrl: 'https://img.a.transfermarkt.technology/portrait/header/287579-1661351631.jpg', position: 'Midfielder', teamCode: 'MAR' },
    { id: 'mar-5', name: 'Azzedine Ounahi', photoUrl: 'https://img.a.transfermarkt.technology/portrait/header/573671-1666878345.jpg', position: 'Midfielder', teamCode: 'MAR' },
    { id: 'mar-6', name: 'Brahim Díaz', photoUrl: 'https://img.a.transfermarkt.technology/portrait/header/314678-1666878160.jpg', position: 'Forward', teamCode: 'MAR' },
    { id: 'mar-7', name: 'Youssef En-Nesyri', photoUrl: 'https://img.a.transfermarkt.technology/portrait/header/433077-1661352427.jpg', position: 'Forward', teamCode: 'MAR' },
    { id: 'mar-8', name: 'Hakim Ziyech', photoUrl: 'https://img.a.transfermarkt.technology/portrait/header/146770-1661351726.jpg', position: 'Forward', teamCode: 'MAR' },
    { id: 'mar-9', name: 'Noussair Mazraoui', photoUrl: 'https://img.a.transfermarkt.technology/portrait/header/340456-1668417863.jpg', position: 'Defender', teamCode: 'MAR' },
    { id: 'mar-10', name: 'Romain Saïss', photoUrl: 'https://img.a.transfermarkt.technology/portrait/header/148374-1661351822.jpg', position: 'Defender', teamCode: 'MAR' },

    // Senegal (SEN)
    { id: 'sen-1', name: 'Édouard Mendy', photoUrl: 'https://img.a.transfermarkt.technology/portrait/header/442531-1661352516.jpg', position: 'Goalkeeper', teamCode: 'SEN' },
    { id: 'sen-2', name: 'Kalidou Koulibaly', photoUrl: 'https://img.a.transfermarkt.technology/portrait/header/93128-1668418042.jpg', position: 'Defender', teamCode: 'SEN' },
    { id: 'sen-3', name: 'Pape Matar Sarr', photoUrl: 'https://img.a.transfermarkt.technology/portrait/header/568641-1658404285.jpg', position: 'Midfielder', teamCode: 'SEN' },
    { id: 'sen-4', name: 'Sadio Mané', photoUrl: 'https://img.a.transfermarkt.technology/portrait/header/204103-1668418114.jpg', position: 'Forward', teamCode: 'SEN' },
    { id: 'sen-5', name: 'Nicolas Jackson', photoUrl: 'https://img.a.transfermarkt.technology/portrait/header/706827-1658404334.jpg', position: 'Forward', teamCode: 'SEN' },
    { id: 'sen-6', name: 'Ismaïla Sarr', photoUrl: 'https://img.a.transfermarkt.technology/portrait/header/339795-1661352575.jpg', position: 'Forward', teamCode: 'SEN' },
    { id: 'sen-7', name: 'Idrissa Gueye', photoUrl: 'https://img.a.transfermarkt.technology/portrait/header/103008-1668418179.jpg', position: 'Midfielder', teamCode: 'SEN' },
    { id: 'sen-8', name: 'Abdou Diallo', photoUrl: 'https://img.a.transfermarkt.technology/portrait/header/332201-1668418211.jpg', position: 'Defender', teamCode: 'SEN' },
    { id: 'sen-9', name: 'Cheikhou Kouyaté', photoUrl: 'https://img.a.transfermarkt.technology/portrait/header/105618-1661352636.jpg', position: 'Midfielder', teamCode: 'SEN' },
    { id: 'sen-10', name: 'Boulaye Dia', photoUrl: 'https://img.a.transfermarkt.technology/portrait/header/318756-1661352749.jpg', position: 'Forward', teamCode: 'SEN' },

    // Egypt (EGY)
    { id: 'egy-1', name: 'Mohamed El Shenawy', photoUrl: 'https://img.a.transfermarkt.technology/portrait/header/112117-1603102434.jpg', position: 'Goalkeeper', teamCode: 'EGY' },
    { id: 'egy-2', name: 'Ahmed Hegazy', photoUrl: 'https://img.a.transfermarkt.technology/portrait/header/122550-1603102476.jpg', position: 'Defender', teamCode: 'EGY' },
    { id: 'egy-3', name: 'Omar Marmoush', photoUrl: 'https://img.a.transfermarkt.technology/portrait/header/442808-1658411226.jpg', position: 'Forward', teamCode: 'EGY' },
    { id: 'egy-4', name: 'Mohamed Salah', photoUrl: 'https://img.a.transfermarkt.technology/portrait/header/148455-1668417621.jpg', position: 'Forward', teamCode: 'EGY' },
    { id: 'egy-5', name: 'Mostafa Mohamed', photoUrl: 'https://img.a.transfermarkt.technology/portrait/header/462103-1666878415.jpg', position: 'Forward', teamCode: 'EGY' },
    { id: 'egy-6', name: 'Mohamed Elneny', photoUrl: 'https://img.a.transfermarkt.technology/portrait/header/178716-1658411168.jpg', position: 'Midfielder', teamCode: 'EGY' },
    { id: 'egy-7', name: 'Trézéguet', photoUrl: 'https://img.a.transfermarkt.technology/portrait/header/203294-1603102557.jpg', position: 'Forward', teamCode: 'EGY' },
    { id: 'egy-8', name: 'Mohamed Abdelmonem', photoUrl: 'https://img.a.transfermarkt.technology/portrait/header/523076-1603102641.jpg', position: 'Defender', teamCode: 'EGY' },
    { id: 'egy-9', name: 'Emam Ashour', photoUrl: 'https://img.a.transfermarkt.technology/portrait/header/717113-1603102712.jpg', position: 'Midfielder', teamCode: 'EGY' },
    { id: 'egy-10', name: 'Zizo', photoUrl: 'https://img.a.transfermarkt.technology/portrait/header/523119-1603102788.jpg', position: 'Midfielder', teamCode: 'EGY' },

    // Ivory Coast (CIV)
    { id: 'civ-1', name: 'Yahia Fofana', photoUrl: 'https://img.a.transfermarkt.technology/portrait/header/463603-1666878485.jpg', position: 'Goalkeeper', teamCode: 'CIV' },
    { id: 'civ-2', name: 'Evan Ndicka', photoUrl: 'https://img.a.transfermarkt.technology/portrait/header/371144-1658411287.jpg', position: 'Defender', teamCode: 'CIV' },
    { id: 'civ-3', name: 'Franck Kessié', photoUrl: 'https://img.a.transfermarkt.technology/portrait/header/294808-1668418215.jpg', position: 'Midfielder', teamCode: 'CIV' },
    { id: 'civ-4', name: 'Sébastien Haller', photoUrl: 'https://img.a.transfermarkt.technology/portrait/header/181375-1658411342.jpg', position: 'Forward', teamCode: 'CIV' },
    { id: 'civ-5', name: 'Simon Adingra', photoUrl: 'https://img.a.transfermarkt.technology/portrait/header/883556-1658411400.jpg', position: 'Forward', teamCode: 'CIV' },
    { id: 'civ-6', name: 'Nicolas Pépé', photoUrl: 'https://img.a.transfermarkt.technology/portrait/header/339340-1661352964.jpg', position: 'Forward', teamCode: 'CIV' },
    { id: 'civ-7', name: 'Serge Aurier', photoUrl: 'https://img.a.transfermarkt.technology/portrait/header/95460-1661353026.jpg', position: 'Defender', teamCode: 'CIV' },
    { id: 'civ-8', name: 'Max Gradel', photoUrl: 'https://img.a.transfermarkt.technology/portrait/header/53418-1661353098.jpg', position: 'Forward', teamCode: 'CIV' },
    { id: 'civ-9', name: 'Jean-Philippe Krasso', photoUrl: 'https://img.a.transfermarkt.technology/portrait/header/351869-1661353152.jpg', position: 'Forward', teamCode: 'CIV' },
    { id: 'civ-10', name: 'Wilfried Singo', photoUrl: 'https://img.a.transfermarkt.technology/portrait/header/522104-1658411503.jpg', position: 'Defender', teamCode: 'CIV' },

    // Nigeria (NGA)
    { id: 'nga-1', name: 'Stanley Nwabali', photoUrl: 'https://img.a.transfermarkt.technology/portrait/header/478028-1701338666.jpg', position: 'Goalkeeper', teamCode: 'NGA' },
    { id: 'nga-2', name: 'William Troost-Ekong', photoUrl: 'https://img.a.transfermarkt.technology/portrait/header/192731-1661352615.jpg', position: 'Defender', teamCode: 'NGA' },
    { id: 'nga-3', name: 'Alex Iwobi', photoUrl: 'https://img.a.transfermarkt.technology/portrait/header/242605-1658411456.jpg', position: 'Midfielder', teamCode: 'NGA' },
    { id: 'nga-4', name: 'Victor Osimhen', photoUrl: 'https://img.a.transfermarkt.technology/portrait/header/401923-1668418298.jpg', position: 'Forward', teamCode: 'NGA' },
    { id: 'nga-5', name: 'Ademola Lookman', photoUrl: 'https://img.a.transfermarkt.technology/portrait/header/361923-1661352695.jpg', position: 'Forward', teamCode: 'NGA' },
    { id: 'nga-6', name: 'Samuel Chukwueze', photoUrl: 'https://img.a.transfermarkt.technology/portrait/header/423855-1668418354.jpg', position: 'Forward', teamCode: 'NGA' },
    { id: 'nga-7', name: 'Wilfred Ndidi', photoUrl: 'https://img.a.transfermarkt.technology/portrait/header/290805-1661352763.jpg', position: 'Midfielder', teamCode: 'NGA' },
    { id: 'nga-8', name: 'Joe Aribo', photoUrl: 'https://img.a.transfermarkt.technology/portrait/header/331716-1661352819.jpg', position: 'Midfielder', teamCode: 'NGA' },
    { id: 'nga-9', name: 'Semi Ajayi', photoUrl: 'https://img.a.transfermarkt.technology/portrait/header/281003-1661352876.jpg', position: 'Defender', teamCode: 'NGA' },
    { id: 'nga-10', name: 'Moses Simon', photoUrl: 'https://img.a.transfermarkt.technology/portrait/header/179944-1661352936.jpg', position: 'Forward', teamCode: 'NGA' },

    // Cameroon (CAM)
    { id: 'cam-1', name: 'André Onana', photoUrl: 'https://img.a.transfermarkt.technology/portrait/header/234509-1668418385.jpg', position: 'Goalkeeper', teamCode: 'CAM' },
    { id: 'cam-2', name: 'Zambo Anguissa', photoUrl: 'https://img.a.transfermarkt.technology/portrait/header/354361-1666878546.jpg', position: 'Midfielder', teamCode: 'CAM' },
    { id: 'cam-3', name: 'Vincent Aboubakar', photoUrl: 'https://img.a.transfermarkt.technology/portrait/header/147487-1661352784.jpg', position: 'Forward', teamCode: 'CAM' },
    { id: 'cam-4', name: 'Karl Toko Ekambi', photoUrl: 'https://img.a.transfermarkt.technology/portrait/header/315130-1661352845.jpg', position: 'Forward', teamCode: 'CAM' },
    { id: 'cam-5', name: 'Bryan Mbeumo', photoUrl: 'https://img.a.transfermarkt.technology/portrait/header/568648-1661352901.jpg', position: 'Forward', teamCode: 'CAM' },
    { id: 'cam-6', name: 'Eric Maxim Choupo-Moting', photoUrl: 'https://img.a.transfermarkt.technology/portrait/header/45660-1668418438.jpg', position: 'Forward', teamCode: 'CAM' },
    { id: 'cam-7', name: 'Collins Fai', photoUrl: 'https://img.a.transfermarkt.technology/portrait/header/184155-1661353213.jpg', position: 'Defender', teamCode: 'CAM' },
    { id: 'cam-8', name: 'Moumi Ngamaleu', photoUrl: 'https://img.a.transfermarkt.technology/portrait/header/260699-1661353278.jpg', position: 'Forward', teamCode: 'CAM' },
    { id: 'cam-9', name: 'Olivier Ntcham', photoUrl: 'https://img.a.transfermarkt.technology/portrait/header/287613-1661353342.jpg', position: 'Midfielder', teamCode: 'CAM' },
    { id: 'cam-10', name: 'Nouhou Tolo', photoUrl: 'https://img.a.transfermarkt.technology/portrait/header/340448-1661353406.jpg', position: 'Defender', teamCode: 'CAM' },

    // Algeria (ALG)
    { id: 'alg-1', name: 'Anthony Mandrea', photoUrl: 'https://img.a.transfermarkt.technology/portrait/header/261023-1666878608.jpg', position: 'Goalkeeper', teamCode: 'ALG' },
    { id: 'alg-2', name: 'Rayan Aït-Nouri', photoUrl: 'https://img.a.transfermarkt.technology/portrait/header/545041-1658411520.jpg', position: 'Defender', teamCode: 'ALG' },
    { id: 'alg-3', name: 'Ismaël Bennacer', photoUrl: 'https://img.a.transfermarkt.technology/portrait/header/351866-1668418465.jpg', position: 'Midfielder', teamCode: 'ALG' },
    { id: 'alg-4', name: 'Riyad Mahrez', photoUrl: 'https://img.a.transfermarkt.technology/portrait/header/171424-1668418545.jpg', position: 'Forward', teamCode: 'ALG' },
    { id: 'alg-5', name: 'Baghdad Bounedjah', photoUrl: 'https://img.a.transfermarkt.technology/portrait/header/230440-1661353001.jpg', position: 'Forward', teamCode: 'ALG' },
    { id: 'alg-6', name: 'Islam Slimani', photoUrl: 'https://img.a.transfermarkt.technology/portrait/header/93132-1661353064.jpg', position: 'Forward', teamCode: 'ALG' },
    { id: 'alg-7', name: 'Youcef Atal', photoUrl: 'https://img.a.transfermarkt.technology/portrait/header/348784-1661353127.jpg', position: 'Defender', teamCode: 'ALG' },
    { id: 'alg-8', name: 'Sofiane Feghouli', photoUrl: 'https://img.a.transfermarkt.technology/portrait/header/75538-1661353189.jpg', position: 'Midfielder', teamCode: 'ALG' },
    { id: 'alg-9', name: 'Aïssa Mandi', photoUrl: 'https://img.a.transfermarkt.technology/portrait/header/118921-1661353253.jpg', position: 'Defender', teamCode: 'ALG' },
    { id: 'alg-10', name: 'Youcef Belaïli', photoUrl: 'https://img.a.transfermarkt.technology/portrait/header/171426-1661353317.jpg', position: 'Forward', teamCode: 'ALG' },

    // Zambia (ZAM)
    { id: 'zam-1', name: 'Patson Daka', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=PatsonDaka', position: 'Forward', teamCode: 'ZAM' },
    { id: 'zam-2', name: 'Fashion Sakala', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=FashionSakala', position: 'Forward', teamCode: 'ZAM' },
    { id: 'zam-3', name: 'Lameck Banda', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=LameckBanda', position: 'Forward', teamCode: 'ZAM' },
    { id: 'zam-4', name: 'Lawrence Mulenga', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=LawrenceMulenga', position: 'Goalkeeper', teamCode: 'ZAM' },
    { id: 'zam-5', name: 'Frankie Musonda', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=FrankieMusonda', position: 'Defender', teamCode: 'ZAM' },
    { id: 'zam-6', name: 'Stoppila Sunzu', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=StoppilaSunzu', position: 'Defender', teamCode: 'ZAM' },
    { id: 'zam-7', name: 'Kelvin Kampamba', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=KelvinKampamba', position: 'Goalkeeper', teamCode: 'ZAM' },
    { id: 'zam-8', name: 'Kings Kangwa', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=KingsKangwa', position: 'Midfielder', teamCode: 'ZAM' },
    { id: 'zam-9', name: 'Rally Bwalya', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=RallyBwalya', position: 'Forward', teamCode: 'ZAM' },
    { id: 'zam-10', name: 'Emmanuel Banda', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=EmmanuelBanda', position: 'Midfielder', teamCode: 'ZAM' },

    // DR Congo (COD)
    { id: 'cod-1', name: 'Chancel Mbemba', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ChancelMbemba', position: 'Defender', teamCode: 'COD' },
    { id: 'cod-2', name: 'Yoane Wissa', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=YoaneWissa', position: 'Forward', teamCode: 'COD' },
    { id: 'cod-3', name: 'Arthur Masuaku', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ArthurMasuaku', position: 'Defender', teamCode: 'COD' },
    { id: 'cod-4', name: 'Cédric Bakambu', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CedricBakambu', position: 'Forward', teamCode: 'COD' },
    { id: 'cod-5', name: 'Gael Kakuta', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GaelKakuta', position: 'Midfielder', teamCode: 'COD' },
    { id: 'cod-6', name: 'Samuel Moutoussamy', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SamuelMoutoussamy', position: 'Midfielder', teamCode: 'COD' },
    { id: 'cod-7', name: 'Simon Banza', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SimonBanza', position: 'Forward', teamCode: 'COD' },
    { id: 'cod-8', name: 'Dylan Batubinsika', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DylanBatubinsika', position: 'Defender', teamCode: 'COD' },
    { id: 'cod-9', name: 'Lionel Mpasi', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=LionelMpasi', position: 'Goalkeeper', teamCode: 'COD' },
    { id: 'cod-10', name: 'Théo Bongonda', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TheoBongonda', position: 'Forward', teamCode: 'COD' },

    // South Africa (ZAF)
    { id: 'zaf-1', name: 'Percy Tau', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=PercyTau', position: 'Forward', teamCode: 'ZAF' },
    { id: 'zaf-2', name: 'Ronwen Williams', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=RonwenWilliams', position: 'Goalkeeper', teamCode: 'ZAF' },
    { id: 'zaf-3', name: 'Teboho Mokoena', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TebohoMokoena', position: 'Midfielder', teamCode: 'ZAF' },
    { id: 'zaf-4', name: 'Themba Zwane', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ThembaZwane', position: 'Midfielder', teamCode: 'ZAF' },
    { id: 'zaf-5', name: 'Evidence Makgopa', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=EvidenceMakgopa', position: 'Forward', teamCode: 'ZAF' },
    { id: 'zaf-6', name: 'Mothobi Mvala', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MothobiMvala', position: 'Defender', teamCode: 'ZAF' },
    { id: 'zaf-7', name: 'Grant Kekana', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GrantKekana', position: 'Defender', teamCode: 'ZAF' },
    { id: 'zaf-8', name: 'Nyiko Mobbie', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=NyikoMobbie', position: 'Defender', teamCode: 'ZAF' },
    { id: 'zaf-9', name: 'Aubrey Modiba', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AubreyModiba', position: 'Midfielder', teamCode: 'ZAF' },
    { id: 'zaf-10', name: 'Khuliso Mudau', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=KhulisoMudau', position: 'Defender', teamCode: 'ZAF' },

    // Tunisia (TUN)
    { id: 'tun-1', name: 'Ellyes Skhiri', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=EllyesSkhiri', position: 'Midfielder', teamCode: 'TUN' },
    { id: 'tun-2', name: 'Youssef Msakni', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=YoussefMsakni', position: 'Forward', teamCode: 'TUN' },
    { id: 'tun-3', name: 'Aissa Laïdouni', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AissaLaidouni', position: 'Midfielder', teamCode: 'TUN' },
    { id: 'tun-4', name: 'Wahbi Khazri', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=WahbiKhazri', position: 'Forward', teamCode: 'TUN' },
    { id: 'tun-5', name: 'Aymen Dahmen', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AymenDahmen', position: 'Goalkeeper', teamCode: 'TUN' },
    { id: 'tun-6', name: 'Wajdi Kechrida', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=WajdiKechrida', position: 'Defender', teamCode: 'TUN' },
    { id: 'tun-7', name: 'Naïm Sliti', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=NaimSliti', position: 'Forward', teamCode: 'TUN' },
    { id: 'tun-8', name: 'Ali Maâloul', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AliMaaloul', position: 'Defender', teamCode: 'TUN' },
    { id: 'tun-9', name: 'Hamza Rafia', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=HamzaRafia', position: 'Midfielder', teamCode: 'TUN' },
    { id: 'tun-10', name: 'Seifeddine Jaziri', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SeifeddineJaziri', position: 'Forward', teamCode: 'TUN' },

    // Burkina Faso (BFA)
    { id: 'bfa-1', name: 'Edmond Tapsoba', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=EdmondTapsoba', position: 'Defender', teamCode: 'BFA' },
    { id: 'bfa-2', name: 'Bertrand Traoré', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=BertrandTraore', position: 'Forward', teamCode: 'BFA' },
    { id: 'bfa-3', name: 'Dango Ouattara', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DangoOuattara', position: 'Forward', teamCode: 'BFA' },
    { id: 'bfa-4', name: 'Issa Kaboré', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=IssaKabore', position: 'Defender', teamCode: 'BFA' },
    { id: 'bfa-5', name: 'Blati Touré', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=BlatiToure', position: 'Midfielder', teamCode: 'BFA' },
    { id: 'bfa-6', name: 'Abdoul Tapsoba', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AbdoulTapsoba', position: 'Forward', teamCode: 'BFA' },
    { id: 'bfa-7', name: 'Steeve Yago', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SteeveYago', position: 'Defender', teamCode: 'BFA' },
    { id: 'bfa-8', name: 'Hervé Koffi', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=HerveKoffi', position: 'Goalkeeper', teamCode: 'BFA' },
    { id: 'bfa-9', name: 'Gustavo Sangaré', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GustavoSangare', position: 'Midfielder', teamCode: 'BFA' },
    { id: 'bfa-10', name: 'Hassane Bandé', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=HassaneBande', position: 'Forward', teamCode: 'BFA' },

    // Mali (MLI)
    { id: 'mli-1', name: 'Yves Bissouma', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=YvesBissouma', position: 'Midfielder', teamCode: 'MLI' },
    { id: 'mli-2', name: 'Amadou Haidara', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AmadouHaidara', position: 'Midfielder', teamCode: 'MLI' },
    { id: 'mli-3', name: 'Hamari Traoré', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=HamariTraore', position: 'Defender', teamCode: 'MLI' },
    { id: 'mli-4', name: 'Adama Traoré', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AdamaTraore', position: 'Forward', teamCode: 'MLI' },
    { id: 'mli-5', name: 'Moussa Djenepo', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MoussaDjenepo', position: 'Forward', teamCode: 'MLI' },
    { id: 'mli-6', name: 'Ibrahima Koné', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=IbrahimaKone', position: 'Forward', teamCode: 'MLI' },
    { id: 'mli-7', name: 'Kiki Kouyaté', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=KikiKouyate', position: 'Defender', teamCode: 'MLI' },
    { id: 'mli-8', name: 'Mohamed Camara', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MohamedCamara', position: 'Midfielder', teamCode: 'MLI' },
    { id: 'mli-9', name: 'Djigui Diarra', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DjiguiDiarra', position: 'Goalkeeper', teamCode: 'MLI' },
    { id: 'mli-10', name: 'Massadio Haïdara', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MassadioHaidara', position: 'Defender', teamCode: 'MLI' },

    // Gabon (GAB)
    { id: 'gab-1', name: 'P.E. Aubameyang', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aubameyang', position: 'Forward', teamCode: 'GAB' },
    { id: 'gab-2', name: 'Mario Lemina', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lemina', position: 'Midfielder', teamCode: 'GAB' },
    { id: 'gab-3', name: 'Denis Bouanga', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bouanga', position: 'Forward', teamCode: 'GAB' },
    { id: 'gab-4', name: 'Jim Allevinah', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JimAllevinah', position: 'Forward', teamCode: 'GAB' },
    { id: 'gab-5', name: 'Aaron Boupendza', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AaronBoupendza', position: 'Forward', teamCode: 'GAB' },
    { id: 'gab-6', name: 'Bruno Ecuele Manga', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=BrunoManga', position: 'Defender', teamCode: 'GAB' },
    { id: 'gab-7', name: 'André Biyogo Poko', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AndreBiyogo', position: 'Midfielder', teamCode: 'GAB' },
    { id: 'gab-8', name: 'Jean-Noël Amonome', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JeanNoelAmonome', position: 'Goalkeeper', teamCode: 'GAB' },
    { id: 'gab-9', name: 'Sidney Obissa', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SidneyObissa', position: 'Defender', teamCode: 'GAB' },
    { id: 'gab-10', name: 'Guélor Kanga', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GuelorKanga', position: 'Midfielder', teamCode: 'GAB' },

    // Guinea (GNE)
    { id: 'gne-1', name: 'Serhou Guirassy', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Guirassy', position: 'Forward', teamCode: 'GNE' },
    { id: 'gne-2', name: 'Naby Keïta', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Keita', position: 'Midfielder', teamCode: 'GNE' },
    { id: 'gne-3', name: 'Ilaix Moriba', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Moriba', position: 'Midfielder', teamCode: 'GNE' },
    { id: 'gne-4', name: 'Amadou Diawara', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AmadouDiawara', position: 'Midfielder', teamCode: 'GNE' },
    { id: 'gne-5', name: 'Mohamed Bayo', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MohamedBayo', position: 'Forward', teamCode: 'GNE' },
    { id: 'gne-6', name: 'Ibrahima Sory Conti', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=IbrahimaConti', position: 'Goalkeeper', teamCode: 'GNE' },
    { id: 'gne-7', name: 'Issiaga Sylla', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=IssiagaSylla', position: 'Defender', teamCode: 'GNE' },
    { id: 'gne-8', name: 'Mouctar Diakhaby', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MouctarDiakhaby', position: 'Defender', teamCode: 'GNE' },
    { id: 'gne-9', name: 'Moréan Kamano', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MoreanKamano', position: 'Forward', teamCode: 'GNE' },
    { id: 'gne-10', name: 'Saidou Sow', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SaidouSow', position: 'Defender', teamCode: 'GNE' },

    // Angola (ANG)
    { id: 'ang-1', name: 'Gelson Dala', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dala', position: 'Forward', teamCode: 'ANG' },
    { id: 'ang-2', name: 'Zito Luvumbo', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Luvumbo', position: 'Forward', teamCode: 'ANG' },
    { id: 'ang-3', name: 'M’Bala Nzola', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nzola', position: 'Forward', teamCode: 'ANG' },
    { id: 'ang-4', name: 'Show', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Show', position: 'Midfielder', teamCode: 'ANG' },
    { id: 'ang-5', name: 'Fredy', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fredy', position: 'Midfielder', teamCode: 'ANG' },
    { id: 'ang-6', name: 'Estrela', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Estrela', position: 'Defender', teamCode: 'ANG' },
    { id: 'ang-7', name: 'Kialonda Gaspar', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=KialondaGaspar', position: 'Defender', teamCode: 'ANG' },
    { id: 'ang-8', name: 'Neí', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nei', position: 'Goalkeeper', teamCode: 'ANG' },
    { id: 'ang-9', name: 'Buatu', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Buatu', position: 'Defender', teamCode: 'ANG' },
    { id: 'ang-10', name: 'Mabululu', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mabululu', position: 'Forward', teamCode: 'ANG' },

    // Equatorial Guinea (EQG)
    { id: 'eqg-1', name: 'Emilio Nsue', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nsue', position: 'Forward', teamCode: 'EQG' },
    { id: 'eqg-2', name: 'Pedro Obiang', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Obiang', position: 'Midfielder', teamCode: 'EQG' },
    { id: 'eqg-3', name: 'Saúl Coco', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Coco', position: 'Defender', teamCode: 'EQG' },
    { id: 'eqg-4', name: 'José Machin', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JoseMachin', position: 'Midfielder', teamCode: 'EQG' },
    { id: 'eqg-5', name: 'Basilio Ndong', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=BasilioNdong', position: 'Defender', teamCode: 'EQG' },
    { id: 'eqg-6', name: 'Pablo Ganet', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=PabloGanet', position: 'Midfielder', teamCode: 'EQG' },
    { id: 'eqg-7', name: 'Iban Salvador', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=IbanSalvador', position: 'Midfielder', teamCode: 'EQG' },
    { id: 'eqg-8', name: 'Jesus Owono', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JesusOwono', position: 'Goalkeeper', teamCode: 'EQG' },
    { id: 'eqg-9', name: 'Esteban Orozco', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=EstebanOrozco', position: 'Defender', teamCode: 'EQG' },
    { id: 'eqg-10', name: 'Jannick Buyla', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JannickBuyla', position: 'Forward', teamCode: 'EQG' },

    // Zimbabwe (ZIM)
    { id: 'zim-1', name: 'Marvelous Nakamba', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nakamba', position: 'Midfielder', teamCode: 'ZIM' },
    { id: 'zim-2', name: 'Tino Kadewere', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kadewere', position: 'Forward', teamCode: 'ZIM' },
    { id: 'zim-3', name: 'Jordan Zemura', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zemura', position: 'Defender', teamCode: 'ZIM' },
    { id: 'zim-4', name: 'Teenage Hadebe', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TeenageHadebe', position: 'Defender', teamCode: 'ZIM' },
    { id: 'zim-5', name: 'Khama Billiat', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=KhamaBilliat', position: 'Forward', teamCode: 'ZIM' },
    { id: 'zim-6', name: 'Petros Mhari', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=PetrosMhari', position: 'Goalkeeper', teamCode: 'ZIM' },
    { id: 'zim-7', name: 'Brendan Galloway', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=BrendanGalloway', position: 'Defender', teamCode: 'ZIM' },
    { id: 'zim-8', name: 'Marshall Munetsi', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MarshallMunetsi', position: 'Midfielder', teamCode: 'ZIM' },
    { id: 'zim-9', name: 'Knowledge Musona', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=KnowledgeMusona', position: 'Forward', teamCode: 'ZIM' },
    { id: 'zim-10', name: 'Divine Lunga', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DivineLunga', position: 'Defender', teamCode: 'ZIM' },

    // Tanzania (TAN)
    { id: 'tan-1', name: 'Mbwana Samatta', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Samatta', position: 'Forward', teamCode: 'TAN' },
    { id: 'tan-2', name: 'Simon Msuva', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Msuva', position: 'Forward', teamCode: 'TAN' },
    { id: 'tan-3', name: 'Himid Mao', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mao', position: 'Midfielder', teamCode: 'TAN' },
    { id: 'tan-4', name: 'Mudathir Yahya', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MudathirYahya', position: 'Defender', teamCode: 'TAN' },
    { id: 'tan-5', name: 'Novatus Miroshi', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=NovatusMiroshi', position: 'Midfielder', teamCode: 'TAN' },
    { id: 'tan-6', name: 'Aishi Manula', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AishiManula', position: 'Goalkeeper', teamCode: 'TAN' },
    { id: 'tan-7', name: 'Mzamiru Yassin', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MzamiruYassin', position: 'Midfielder', teamCode: 'TAN' },
    { id: 'tan-8', name: 'Erasto Nyoni', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ErastoNyoni', position: 'Midfielder', teamCode: 'TAN' },
    { id: 'tan-9', name: 'Feisal Salum', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=FeisalSalum', position: 'Forward', teamCode: 'TAN' },
    { id: 'tan-10', name: 'Bakari Mwamnyeto', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=BakariMwamnyeto', position: 'Defender', teamCode: 'TAN' },

    // Uganda (UGA)
    { id: 'uga-1', name: 'Khalid Aucho', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aucho', position: 'Midfielder', teamCode: 'UGA' },
    { id: 'uga-2', name: 'Emmanuel Okwi', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Okwi', position: 'Forward', teamCode: 'UGA' },
    { id: 'uga-3', name: 'Bevis Mugabi', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mugabi', position: 'Defender', teamCode: 'UGA' },
    { id: 'uga-4', name: 'Denis Onyango', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DenisOnyango', position: 'Goalkeeper', teamCode: 'UGA' },
    { id: 'uga-5', name: 'Farouk Miya', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=FaroukMiya', position: 'Midfielder', teamCode: 'UGA' },
    { id: 'uga-6', name: 'Allan Okello', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AllanOkello', position: 'Midfielder', teamCode: 'UGA' },
    { id: 'uga-7', name: 'Halid Lwaliwa', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=HalidLwaliwa', position: 'Defender', teamCode: 'UGA' },
    { id: 'uga-8', name: 'Murushid Juuko', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MurushidJuuko', position: 'Defender', teamCode: 'UGA' },
    { id: 'uga-9', name: 'Yunus Sentamu', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=YunusSentamu', position: 'Forward', teamCode: 'UGA' },
    { id: 'uga-10', name: 'Godfrey Walusimbi', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GodfreyWalusimbi', position: 'Defender', teamCode: 'UGA' },

    // Sudan (SUD)
    { id: 'sud-1', name: 'Mohamed Abdelrahman', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Abdelrahman', position: 'Forward', teamCode: 'SUD' },
    { id: 'sud-2', name: 'Athar El Tahir', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tahir', position: 'Defender', teamCode: 'SUD' },
    { id: 'sud-3', name: 'Ali Abu Eshrein', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AliAbuEshrein', position: 'Goalkeeper', teamCode: 'SUD' },
    { id: 'sud-4', name: 'Mustafa Karshoum', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MustafaKarshoum', position: 'Midfielder', teamCode: 'SUD' },
    { id: 'sud-5', name: 'Mohamed Al Rashed', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MohamedAlRashed', position: 'Defender', teamCode: 'SUD' },
    { id: 'sud-6', name: 'Walieldin Khedr', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=WalieldinKhedr', position: 'Midfielder', teamCode: 'SUD' },
    { id: 'sud-7', name: 'Yasir Mozamil', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=YasirMozamil', position: 'Forward', teamCode: 'SUD' },
    { id: 'sud-8', name: 'Amir Kamal', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AmirKamal', position: 'Defender', teamCode: 'SUD' },
    { id: 'sud-9', name: 'Ramadan Agab', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=RamadanAgab', position: 'Midfielder', teamCode: 'SUD' },
    { id: 'sud-10', name: 'Ahmed Hamid', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AhmedHamid', position: 'Defender', teamCode: 'SUD' },

    // Comoros (COM)
    { id: 'com-1', name: 'Youssouf M\'Changama', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mchangama', position: 'Midfielder', teamCode: 'COM' },
    { id: 'com-2', name: 'El Fardou Ben Nabouhane', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ben', position: 'Forward', teamCode: 'COM' },
    { id: 'com-3', name: 'Faiz Selemani', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=FaizSelemani', position: 'Forward', teamCode: 'COM' },
    { id: 'com-4', name: 'Mohamed M\'Changama', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MohamedMchangama', position: 'Midfielder', teamCode: 'COM' },
    { id: 'com-5', name: 'Kassim Abdallah', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=KassimAbdallah', position: 'Defender', teamCode: 'COM' },
    { id: 'com-6', name: 'Chaker Alhadhur', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ChakerAlhadhur', position: 'Goalkeeper', teamCode: 'COM' },
    { id: 'com-7', name: 'Younn Zahary', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=YounnZahary', position: 'Defender', teamCode: 'COM' },
    { id: 'com-8', name: 'Fouad Bachirou', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=FouadBachirou', position: 'Midfielder', teamCode: 'COM' },
    { id: 'com-9', name: 'Rafidine Abdullah', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=RafidineAbdullah', position: 'Midfielder', teamCode: 'COM' },
    { id: 'com-10', name: 'Ibroihim Youssouf', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=IbroihimYoussouf', position: 'Defender', teamCode: 'COM' },

    // Malawi (MAW)
    { id: 'maw-1', name: 'Gabadinho Mhango', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mhango', position: 'Forward', teamCode: 'MAW' },
    { id: 'maw-2', name: 'Richard Mbulu', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mbulu', position: 'Forward', teamCode: 'MAW' },
    { id: 'maw-3', name: 'Khuda Muyaba', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=KhudaMuyaba', position: 'Forward', teamCode: 'MAW' },
    { id: 'maw-4', name: 'John Banda', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JohnBanda', position: 'Midfielder', teamCode: 'MAW' },
    { id: 'maw-5', name: 'Ernest Kakhobwe', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ErnestKakhobwe', position: 'Goalkeeper', teamCode: 'MAW' },
    { id: 'maw-6', name: 'Gomezgani Chirwa', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GomezganiChirwa', position: 'Defender', teamCode: 'MAW' },
    { id: 'maw-7', name: 'Lawrence Chaziya', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=LawrenceChaziya', position: 'Defender', teamCode: 'MAW' },
    { id: 'maw-8', name: 'Charles Petro', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CharlesPetro', position: 'Defender', teamCode: 'MAW' },
    { id: 'maw-9', name: 'Robin Ngalande', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=RobinNgalande', position: 'Forward', teamCode: 'MAW' },
    { id: 'maw-10', name: 'Yamikani Chester', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=YamikaniChester', position: 'Midfielder', teamCode: 'MAW' },

    // Mozambique (MOZ)
    { id: 'moz-1', name: 'Geny Catamo', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Catamo', position: 'Forward', teamCode: 'MOZ' },
    { id: 'moz-2', name: 'Reinildo Mandava', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Reinildo', position: 'Defender', teamCode: 'MOZ' },
    { id: 'moz-3', name: 'Stanley Ratifo', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=StanleyRatifo', position: 'Forward', teamCode: 'MOZ' },
    { id: 'moz-4', name: 'Domingues', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Domingues', position: 'Midfielder', teamCode: 'MOZ' },
    { id: 'moz-5', name: 'Witi', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Witi', position: 'Midfielder', teamCode: 'MOZ' },
    { id: 'moz-6', name: 'Ernan Siluane', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ErnanSiluane', position: 'Goalkeeper', teamCode: 'MOZ' },
    { id: 'moz-7', name: 'Bruno Langa', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=BrunoLanga', position: 'Defender', teamCode: 'MOZ' },
    { id: 'moz-8', name: 'Mexer', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mexer', position: 'Defender', teamCode: 'MOZ' },
    { id: 'moz-9', name: 'Clesio Bauque', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ClesioBauque', position: 'Forward', teamCode: 'MOZ' },
    { id: 'moz-10', name: 'Shaquille', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Shaquille', position: 'Forward', teamCode: 'MOZ' },
];

export const getPlayersByTeam = (teamCode: string): Player[] => {
    const teamPlayers = players.filter(p => p.teamCode === teamCode);

    // If no players found, return some generic mock players
    if (teamPlayers.length === 0) {
        return [
            { id: `${teamCode}-m1`, name: 'Star Player', photoUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${teamCode}1`, position: 'Midfielder', teamCode },
            { id: `${teamCode}-m2`, name: 'Captain', photoUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${teamCode}2`, position: 'Defender', teamCode },
            { id: `${teamCode}-m3`, name: 'Striker', photoUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${teamCode}3`, position: 'Forward', teamCode },
        ];
    }

    return teamPlayers;
};
