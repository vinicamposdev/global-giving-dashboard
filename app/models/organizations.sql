create table organizations (
	id INT PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
    city VARCHAR(50),
    state VARCHAR(50),
    postal varchar(50),
    address varchar(150),
    url varchar(150),
    logoUrl varchar(100),
    totalProjects smallint DEFAULT 0 CHECK (totalProjects >= 0)
);


{
  query: '\n' +
    '      INSERT INTO organizations (\n' +
    '\t\t\t\tid,\n' +
    '        name,\n' +
    '        city,\n' +
    '        state,\n' +
    '        postal,\n' +
    '        address,\n' +
    '        url,\n' +
    '        logoUrl,\n' +
    '        totalProjects)\n' +
    "\t\t\tVALUES ('65', 'Dharitri Development Society', 'Zaheerabad Mandal, Medak', 'Andhra Pradesh, Past', '502318', 'Dharitri Development Society #6-85, New Housing Colony ', '', '', '1'),('66', 'Integrated Village Development Society', 'Srikakulam District', 'Andhra Pradesh', '', 'Burujawada Village Sarvakotta Mandalam ', '', '', '1'),('67', 'K'inal Antzetik', 'San Cristobal D.L.C.', 'Chiapas', '', 'Calzada de la Escuela #25 Quinta San Martin ', 'http://www.laneta.apc.org/kinal/', 'https://www.globalgiving.org/pfil/organ/67/orglogo.jpg', '3'),('68', 'Suraksha', 'Kamalanagar, Bangalore', 'Karnataka', '560 079', 'No76, 4th Cross Grihalaxmi Layout, 2nd Stage ', '', '', '1'),('69', 'Market of Convenience, M.O.C.', 'Lagos', 'Lagos State', '', '#14/Remilekun St/off Falolu Rd Surulere ', '', '', '1'),('70', 'Happy Childhood Foundation', 'Lublin', 'Lubelskie', '20-113', 'ul. Jezuicka 4/9 ', 'http://www.fsd.lublin.pl/', '', '1'),('71', 'Gramin Vikas Vigyan Samiti (Gravis)', 'Jodhpur', 'Rajasthan', '342001', '3/458 Milkman Colony Pal Road ', 'http://www.gravis.org.in/', '', '12'),('72', 'Int'l Coalition to Protect the Polish Countryside', 'Stryszow', 'Malopolska', '34-146', 'Stryszow 156 ', 'http://www.icppc.pl', '', '1'),('73', 'Mythri Sarva Seva Samithi', 'Bangalore', 'Karnataka', '560 075', '1300 D,  1st Cross 1st HAL 3, New Thippasandra ', 'http://www.wastewisetrust.org', '', '1'),('74', 'Rain Centre (Akash Ganga Trust)', 'Chennai', 'Tamilnadu', '600 028', '4, 3rd Trust Link Street Mandavelipakkam ', 'http://www.raincentre.org', '', '1');\n" +
    '\t\t\t\n' +
    '\t\t\tINSERT INTO countries_organizations (organization_id, country_code)\n' +
    "\t\t\tVALUES ('65', 'IN'),('66', 'IN'),('67', 'MX'),('68', 'IN'),('69', 'NG'),('70', 'PL'),('71', 'IN'),('72', 'PL'),('73', 'IN'),('74', 'IN');\n" +
    '\n' +
    '\t\t\tINSERT INTO themes_organizations (organization_id, theme_id)\n' +
    "\t\t\tVALUES ('65', 'env'),('66', 'health'),('67', 'ecdev'),('68', 'health'),('69', 'ecdev'),('70', 'edu'),('71', 'climate'),('71', 'ecdev'),('71', 'edu'),('71', 'env'),('71', 'health'),('72', 'env'),('73', 'ecdev'),('74', 'ecdev');\n" +
    '    '
}
