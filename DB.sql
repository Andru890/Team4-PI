-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: visual_studio_db
-- ------------------------------------------------------
-- Server version	8.4.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `characteristic` varchar(1000) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `category_id` bigint DEFAULT NULL,
  `stock` int DEFAULT NULL,
  `images` varbinary(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_o61fmio5yukmmiqgnxf8pnavn` (`name`),
  KEY `FK_CATEGORY_ID` (`category_id`),
  CONSTRAINT `FK_CATEGORY_ID` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=270 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (246,NULL,'Esta cámara réflex de Canon está muy equilibrada en cuanto a precio y calidad tanto en fotografía como en vídeo. Si no buscas una cámara profesional pero tampoco quieres quedarte corto, la Canon EOS 850D es una opción muy interesante:',NULL,'Canon E0S 850D',832,1,1,_binary '�\�\0sr\0java.util.ArrayListx�\��\�a�\0I\0sizexp\0\0\0w\0\0\0t\0nhttps://res.cloudinary.com/wilsondelcanto-dev/image/upload/v1716069818/visual-service/vyz7wauxancpgyttulgf.jpgx'),(247,NULL,'Esta cámara réflex puede ser una opción interesante si quieres buenos resultados fotográficos a la vez que consigues unas tomas de vídeo en 4K de muy buena calidad incluso en situaciones de poca luz.',NULL,'NIKON D7500',1019,1,1,_binary '�\�\0sr\0java.util.ArrayListx�\��\�a�\0I\0sizexp\0\0\0w\0\0\0t\0nhttps://res.cloudinary.com/wilsondelcanto-dev/image/upload/v1716069990/visual-service/vo5qvbymezheuoaif3id.jpgx'),(248,NULL,'La OM-D E-M10 Mark IV es una cámara sin espejo de Olympus, ideal para viajes, tiene muy buena relación calidad precio y puede ser una opción para adentrarte en el mundo del vídeo con resultados más que aceptables.',NULL,'OLYMPUS OM-D E-M10 MARK IV',710,1,1,_binary '�\�\0sr\0java.util.ArrayListx�\��\�a�\0I\0sizexp\0\0\0w\0\0\0t\0nhttps://res.cloudinary.com/wilsondelcanto-dev/image/upload/v1716070123/visual-service/pjc403lk3jksbnfnhjfx.jpgx'),(249,NULL,'Esta Sony A7 III no es para ti si recién te inicias en vídeo o en fotografía, ni por prestaciones ni por presupuesto. Es una cámara de vídeo para aficionados avanzados o para los que quieran obtener resultados muy profesionales.',NULL,'SONY A7 III',1189,1,1,_binary '�\�\0sr\0java.util.ArrayListx�\��\�a�\0I\0sizexp\0\0\0w\0\0\0t\0nhttps://res.cloudinary.com/wilsondelcanto-dev/image/upload/v1716070189/visual-service/bhyxk97soy4y30syunn9.pngx'),(250,NULL,'Con sensor de fotograma completo, excelente visor electrónico, muy buen rango dinámico y autoenfoque con seguimiento de animales y ojo en grabaciones de vídeo, esta Nikon Z6 II tiene mucho que ofrecer a los fotógrafos que también hacen vídeo.',NULL,'NIKON Z6 II',2170,1,1,_binary '�\�\0sr\0java.util.ArrayListx�\��\�a�\0I\0sizexp\0\0\0w\0\0\0t\0nhttps://res.cloudinary.com/wilsondelcanto-dev/image/upload/v1716070220/visual-service/qop2xzv509imspapoju4.pngx'),(251,NULL,'Otra cámara EVIL que vale la pena tener en el radar si lo que te gusta es grabar vídeo pero, además, disfrutas haciendo fotografía, es esta sin espejo de Fujifilm. Está pensada para vlogging pero ofrece mucho más en cuanto a vídeo. Lo más destacable es que graba sin recortes con proporción 3:2 y una resolución de 6,2K.',NULL,'FUJIFILM X-S20',1361,1,1,_binary '�\�\0sr\0java.util.ArrayListx�\��\�a�\0I\0sizexp\0\0\0w\0\0\0t\0nhttps://res.cloudinary.com/wilsondelcanto-dev/image/upload/v1716070265/visual-service/agryn6vy5hrxul3ie9aq.jpgx'),(252,NULL,'Sin espejo impresionante para grabar vídeo es la Lumix GH5s. Está concebida precisamente para ello y, si bien no es barata, si puedes permitírtela es una apuesta segura con la que conseguirás resultados espectaculares, además de buena cámara fotográfica',NULL,'PANASONIC LUMIX GH5S',1299,1,1,_binary '�\�\0sr\0java.util.ArrayListx�\��\�a�\0I\0sizexp\0\0\0w\0\0\0t\0nhttps://res.cloudinary.com/wilsondelcanto-dev/image/upload/v1716070292/visual-service/a4ktavfgc4g0txhnnwl0.jpgx'),(253,NULL,'Tengo que confesar que la Nikon Z50 se ha convertido en mi nueva favorita dentro de las cámaras de fotos para aficionados. Por un precio por debajo de los 1000 euros ofrece excelentes prestaciones tanto para fotografía como para vídeo.',NULL,'NIKON Z50',867,1,1,_binary '�\�\0sr\0java.util.ArrayListx�\��\�a�\0I\0sizexp\0\0\0w\0\0\0t\0nhttps://res.cloudinary.com/wilsondelcanto-dev/image/upload/v1716070328/visual-service/oalwfp8ucfqtsytepvq8.jpgx'),(254,NULL,'Esta cámara sin espejo para aficionados avanzados, además de ser bastante compacta y ligera, no solo tiene un precio más que atractivo, sino que es perfecta para pequeñas producciones, vloggers y otros creadores de contenido que quieren hacer tanto fotografía como vídeo.',NULL,'CANON EOS M6 MARK II',1999,1,1,_binary '�\�\0sr\0java.util.ArrayListx�\��\�a�\0I\0sizexp\0\0\0w\0\0\0t\0nhttps://res.cloudinary.com/wilsondelcanto-dev/image/upload/v1716070356/visual-service/z4uwycrc1cge8bj2z2t5.jpgx'),(255,NULL,'Una cámara sin espejo espectacular tanto para fotografía como para vídeo. Puedes ir haciendo una señal al lado de cada una de las características que te recomendé al empezar esta artículo porque tiene todo lo que puedas imaginar.',NULL,'OLYMPUS OM-D E-M10 MARK V',710,1,1,_binary '�\�\0sr\0java.util.ArrayListx�\��\�a�\0I\0sizexp\0\0\0w\0\0\0t\0nhttps://res.cloudinary.com/wilsondelcanto-dev/image/upload/v1716072431/visual-service/pnjpaqenqdk0lr2d0jwo.jpgx'),(256,NULL,'Una cámara sin espejo espectacular tanto para fotografía como para vídeo. Puedes ir haciendo una señal al lado de cada una de las características que te recomendé al empezar esta artículo porque tiene todo lo que puedas imaginar.',NULL,'SONY A6600',1189,1,1,_binary '�\�\0sr\0java.util.ArrayListx�\��\�a�\0I\0sizexp\0\0\0w\0\0\0t\0nhttps://res.cloudinary.com/wilsondelcanto-dev/image/upload/v1716072513/visual-service/wfuqfzxztpfkusumkeid.jpgx'),(257,NULL,'Increíblemente pequeño - Con un peso de sólo 9 g, el micrófono inalambrico solapa LARK M2 permanecerá firmemente sujeto a su ropa. Con su reproducción de sonido sin pérdidas y sus extraordinarias capacidades de grabación, te ofrece un excelente rendimiento de grabación sin igual.',NULL,'Hollyland Lark M2 Combo',199,1,1,_binary '�\�\0sr\0java.util.ArrayListx�\��\�a�\0I\0sizexp\0\0\0w\0\0\0t\0nhttps://res.cloudinary.com/wilsondelcanto-dev/image/upload/v1716072546/visual-service/ivpgsexz1vykuqdtdh52.jpgx'),(258,NULL,'Hay 3 tipos de accesorios de conexión para micrófono Lavalier inalámbrico FULAIM X5: adaptador de iPhone, adaptador tipo C, cable de audio de cámara de 3,5 mm. El sistema de micrófono Lavalier es ampliamente compatible con iPhone, iPad, Samsung, teléfono Android, cámara, laptop, tableta y computadora. Plug and Play, emparejamiento automático una vez que los enciende. Permite un rango de transmisión de hasta 200 m.',NULL,'FULAIM X5',116,1,1,_binary '�\�\0sr\0java.util.ArrayListx�\��\�a�\0I\0sizexp\0\0\0w\0\0\0t\0nhttps://res.cloudinary.com/wilsondelcanto-dev/image/upload/v1716072616/visual-service/ywfczur4rdiwhna0fwmw.jpgx'),(259,NULL,'BOYALINK viene con un estuche de carga, un pequeño estuche portátil que contiene 1 receptor y 2 transmisores, así como 3 adaptadores (Lightning, Type-C y conectores Jack de 3,5MM). Esto asegura su gran flexibilidad y amplia compatibilidad.',NULL,'BOYALINK',109,1,1,_binary '�\�\0sr\0java.util.ArrayListx�\��\�a�\0I\0sizexp\0\0\0w\0\0\0t\0nhttps://res.cloudinary.com/wilsondelcanto-dev/image/upload/v1716072704/visual-service/kejuiwk8fotjsypq6t7z.jpgx'),(260,NULL,'El VideoMicro II combina un sonido impresionante con un funcionamiento increíblemente sencillo. No necesita pilas, ya que se alimenta por su conexión de 3,5 mm, y no hay interruptores ni controles complicados; basta con conectar el micrófono y pulsar el botón de grabación de la cámara o smartphone para capturar audio profesional.',NULL,'RØDE VideoMicro II',75,1,1,_binary '�\�\0sr\0java.util.ArrayListx�\��\�a�\0I\0sizexp\0\0\0w\0\0\0t\0nhttps://res.cloudinary.com/wilsondelcanto-dev/image/upload/v1716072734/visual-service/q2ghz3gbsuqqzkiri9oa.jpgx'),(261,NULL,'El micrófono condensador de escopeta BY-BM6060 está diseñado para la producción de video y la adquisición de audio de transmisión (ENG/EFP). Ideal para entrevistas, películas independientes, programas de televisión, documentales, videos promocionales y grabaciones de estudio.',NULL,'XLR de Escopeta BY-BM6060',85,1,1,_binary '�\�\0sr\0java.util.ArrayListx�\��\�a�\0I\0sizexp\0\0\0w\0\0\0t\0nhttps://res.cloudinary.com/wilsondelcanto-dev/image/upload/v1716072763/visual-service/evirzyn006dfs4nhmke3.jpgx'),(262,NULL,'Esta luz LED para escenario es perfecta para decoración de interiores y exteriores, decoración de dormitorio, plaza pública, pista de patinaje, suministros de fiesta de cumpleaños, reunión familiar, discoteca, bar, banquete, boda, baile, hotel, karaoke, conciertos y otros lugares de entretenimiento.',NULL,'Fresnel COB de 200 W',132,2,1,_binary '�\�\0sr\0java.util.ArrayListx�\��\�a�\0I\0sizexp\0\0\0w\0\0\0t\0nhttps://res.cloudinary.com/wilsondelcanto-dev/image/upload/v1716072793/visual-service/np5jriurotfguchiasji.jpgx'),(263,NULL,'Con 252 LED blanco cálido, 252 LED blanco frío, 140 LED RGB, esta luz de video LED de 50 W y 644 LED cuenta con una iluminación máxima de 3800 lux/3.3 ft, temperatura de color ajustable de 2300 K ~ 8500 K, modo de 27 colores y brillo ajustable del 0% al 100%.',NULL,'Kit de iluminación ALTSON, 2 luces LED bicolor de 50 W',153,2,1,_binary '�\�\0sr\0java.util.ArrayListx�\��\�a�\0I\0sizexp\0\0\0w\0\0\0t\0nhttps://res.cloudinary.com/wilsondelcanto-dev/image/upload/v1716072826/visual-service/z3qqhvxowud6r46mpc3t.jpgx'),(264,NULL,'Proporciona 3 temperaturas de color (2800 K, 4800 K y 6500 K) para crear varios ambientes de iluminación; esta luz de estudio mejorada está equipada con 352 cuentas LED para hacer que la luz sea más amplia y evitar sombras innecesarias. Cuenta con un alto CRI de 97+ para una reproducción precisa del color. Ajusta el brillo en un rango de 10 a 100% con botón hacia arriba y hacia abajo en el control remoto para satisfacer diferentes circunstancias de fotografía, ofreciendo iluminación adicional para tus trabajos',NULL,'Kit de iluminación NiceVeedi Studio, 2 luces LED de 2800-6500K',50,2,1,_binary '�\�\0sr\0java.util.ArrayListx�\��\�a�\0I\0sizexp\0\0\0w\0\0\0t\0nhttps://res.cloudinary.com/wilsondelcanto-dev/image/upload/v1716072847/visual-service/k5zmc708jfwz537ecpid.jpgx'),(265,NULL,'Nueva tecnología COB luz de escenario: basada en la última tecnología COB (chip on board), las luces de escenario de iglesia emiten alta intensidad, alta uniformidad, haz de luz blanca fría/blanca cálida de mayor calidad con menos consumo de energía en comparación con la antigua tecnología LED, rango efectivo de 19.7 ft, ángulo de haz de 78°.',NULL,'BETOPPER COB de 200 W',103,2,1,_binary '�\�\0sr\0java.util.ArrayListx�\��\�a�\0I\0sizexp\0\0\0w\0\0\0t\0nhttps://res.cloudinary.com/wilsondelcanto-dev/image/upload/v1716072869/visual-service/bdjyrztlwzrevhnqx8ur.jpgx'),(266,NULL,'2 proyectores de luz de video de tungsteno Fresnel de 1000 W + 1 estudio de luz de tungsteno de 650 W. Estas series Fresnel son ideales para su uso donde se requieren focos Fresnel de tungsteno compactos y ligeros. Es la solución perfecta en pequeños estudios donde la altura de la rejilla es un problema. La construcción de aluminio extruido y fundido a presión resistente a la corrosión maximiza la fuerza del cuerpo mientras mantiene el peso ligero de un accesorio de ubicación ideal, a pesar del tamaño pequeño, lentes de longitud focal corta con ángulos más anchos dan más salida de luz y una mejor distribución de la luz en toda el área de bearn. El atenuador se puede instalar en estos artículos',NULL,'Came-TV Fresnel de tungsteno, 2 x 1000 W y 1 x 650 W',520,2,1,_binary '�\�\0sr\0java.util.ArrayListx�\��\�a�\0I\0sizexp\0\0\0w\0\0\0t\0nhttps://res.cloudinary.com/wilsondelcanto-dev/image/upload/v1716072891/visual-service/mzezgszm2zibhylfv4ot.jpgx'),(267,NULL,'Hecho de aleación de aluminio de alta calidad que hace que la estructura sea más estable, duradera, portátil y ligera',NULL,'Kit EMART, 2 Soporte de luz de 7 pies',30,3,1,_binary '�\�\0sr\0java.util.ArrayListx�\��\�a�\0I\0sizexp\0\0\0w\0\0\0t\0nhttps://res.cloudinary.com/wilsondelcanto-dev/image/upload/v1716072916/visual-service/lijloktmye1xpefh1qnb.jpgx'),(268,NULL,'El soporte de luz SmallRig 3736 cuenta con un cojín de aire confiable, que evita eficazmente caídas repentinas y pellizcos de los dedos durante el ajuste de altura. Mejora la seguridad y la estabilidad para la toma de fotos y videos.',NULL,'SMALLRIG RA-S280-3736 Soporte de luz de 110 pulgadas',68,3,1,_binary '�\�\0sr\0java.util.ArrayListx�\��\�a�\0I\0sizexp\0\0\0w\0\0\0t\0nhttps://res.cloudinary.com/wilsondelcanto-dev/image/upload/v1716072941/visual-service/lf2lp73qbvxh1yqqq334.jpgx'),(269,NULL,'Estabilizador de cámara, cardán de mano de 3 ejes para cámaras DSLR y sin espejo, carga útil de hasta 4.4 libras compatible con Sony, Panasonic Lumix, Nikon, Canon. Diseño ligero para la filmación de video en movimiento.',NULL,'DJI Ronin-SC - Estabilizador de cámara',279,3,1,_binary '�\�\0sr\0java.util.ArrayListx�\��\�a�\0I\0sizexp\0\0\0w\0\0\0t\0nhttps://res.cloudinary.com/wilsondelcanto-dev/image/upload/v1716073091/visual-service/rkslbbmsl5rfnijfctg8.jpgx');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_detail`
--

DROP TABLE IF EXISTS `products_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products_detail` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `characteristic` varchar(1000) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `product_id` bigint DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_PRODUCT_ID` (`product_id`),
  CONSTRAINT `FK_PRODUCT_ID` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_detail`
--

LOCK TABLES `products_detail` WRITE;
/*!40000 ALTER TABLE `products_detail` DISABLE KEYS */;
INSERT INTO `products_detail` VALUES (1,'bonita',NULL,NULL,'https://');
/*!40000 ALTER TABLE `products_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `active` bit(1) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,NULL,'administrador','admin'),(4,NULL,'usuario','customer');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Cámaras','Camaras de fotos y video.',NULL,'https://res.cloudinary.com/wilsondelcanto-dev/image/upload/v1717018987/categories/adatfk3bwthx713nbyyc.jpg'),(2,'Sonido','Equipos de sonido.',NULL,'https://res.cloudinary.com/wilsondelcanto-dev/image/upload/v1717019008/categories/p4imbfvzytianq3rjsqx.jpg'),(3,'Luces','Luces para eventos.',NULL,'https://res.cloudinary.com/wilsondelcanto-dev/image/upload/v1717019028/categories/pfoeqmaypxsh45debsju.jpg'),(4,'Accesorios','Accesorios para eventos.',NULL,'https://res.cloudinary.com/wilsondelcanto-dev/image/upload/v1717018983/categories/l0zanig5xcmuz3crdiex.jpg');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `rol_id` bigint DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `role_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_5ebu3sks5y7mnb71lkm84hxqj` (`rol_id`),
  KEY `FKp56c1712k691lhsyewcssf40f` (`role_id`),
  CONSTRAINT `FK_ROL_ID` FOREIGN KEY (`rol_id`) REFERENCES `roles` (`id`),
  CONSTRAINT `FKp56c1712k691lhsyewcssf40f` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,NULL,NULL,'admin@visualstudioservice.com',NULL,'admin','123123',NULL,NULL,NULL,1),(24,NULL,'Chile','wilsondelcanto.redes@gmail.com',NULL,'Wilson','123123',NULL,'Del Canto','954205188',4),(28,NULL,'Chile','wilson@gmail.com',NULL,'wilson','123123',NULL,'del canto','123123123',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-09  0:10:56
