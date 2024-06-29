-- AGREGAR CARACTERISTICAS DE PRODUCTOS
INSERT INTO products_detail (
	id,
	characteristic,
	image_url
) VALUES
		(1, 'Excelente Resolución', 'https://res.cloudinary.com/wilsondelcanto-dev/image/upload/v1719688952/features/po2vttsd2t1fsbjo9gip.svg'),
    (2, 'Sensibilidad ISO', 'https://res.cloudinary.com/wilsondelcanto-dev/image/upload/v1719688955/features/ya01leblxafwubibgbio.svg'),
    (3, 'Peso adecuado', 'https://res.cloudinary.com/wilsondelcanto-dev/image/upload/v1719688952/features/dcz30qgeqprfvwnwyur3.svg'),
    (4, 'Extensa duración de la batería', 'https://res.cloudinary.com/wilsondelcanto-dev/image/upload/v1719688952/features/wdvggnsrywcjesxsbxtx.svg'),
    (5, 'Zoom óptico', 'https://res.cloudinary.com/wilsondelcanto-dev/image/upload/v1719688960/features/eybfweycbmckrlgfvthp.svg' ),
    (6, 'Estabilización de imagen', 'https://res.cloudinary.com/wilsondelcanto-dev/image/upload/v1719688959/features/n0rlqui8oravgxc4t8ho.svg'),
    (7, 'Conectividad WIFI', 'https://res.cloudinary.com/wilsondelcanto-dev/image/upload/v1719688960/features/h6454uypgpeakuia5ml0.svg' ),
    (8, 'Modos de disparo', 'https://res.cloudinary.com/wilsondelcanto-dev/image/upload/v1719688955/features/an1qojqlglf2xi8f6esh.svg'),
    (9, 'Potencia de salida', 'https://res.cloudinary.com/wilsondelcanto-dev/image/upload/v1719688957/features/ks3j1jbb6z1iiimsuto0.svg'),
    (10, 'Respuesta de frecuencia', 'https://res.cloudinary.com/wilsondelcanto-dev/image/upload/v1719688957/features/fyyvduxvavoxl2layp03.svg'),
    (11, 'Conectividad', 'https://res.cloudinary.com/wilsondelcanto-dev/image/upload/v1719688960/features/df9jk8w5r2pdch7ahfs2.svg'),
    (12, 'Impedancia', 'https://res.cloudinary.com/wilsondelcanto-dev/image/upload/v1719688953/features/vnocrzxbikejvovcvje5.svg'),
    (13, 'Control remoto', 'https://res.cloudinary.com/wilsondelcanto-dev/image/upload/v1719688957/features/nux2sw4vjnzsxnbu3px0.svg'),
    (14, 'Calidad de sonido', 'https://res.cloudinary.com/wilsondelcanto-dev/image/upload/v1719688957/features/camppc6iholn7yti9a1q.svg'),
    (15, 'Temperatura de color', 'https://res.cloudinary.com/wilsondelcanto-dev/image/upload/v1719688958/features/p8nippipwtgalwmtjlyk.svg' ),
    (16, 'Duración de la lámpara', 'https://res.cloudinary.com/wilsondelcanto-dev/image/upload/v1719688953/features/xtdcivspuywwyzfyp1nx.svg'),
    (17, 'Accesorios incluidos', 'https://res.cloudinary.com/wilsondelcanto-dev/image/upload/v1719688959/features/mnos82mret6si2hjodez.svg'),
    (18, 'Resistente al agua', 'https://res.cloudinary.com/wilsondelcanto-dev/image/upload/v1719688959/features/jrj2sx3368lvqu91euna.svg'),
    (19, 'Excelente Material', 'https://res.cloudinary.com/wilsondelcanto-dev/image/upload/v1719688952/features/rbdhm8jvebwfeqokyzgg.svg'),
    (20, 'Portabilidad', 'https://res.cloudinary.com/wilsondelcanto-dev/image/upload/v1719688958/features/dc7pvemchab6nmjeaqgd.svg');

-- AGREGAR CATEGORIAS DE PRODUCTOS
INSERT INTO categories (id, name, image_url, description) VALUES
	 (1, 'Cámaras', 'https://res.cloudinary.com/wilsondelcanto-dev/image/upload/v1717018987/categories/adatfk3bwthx713nbyyc.jpg', 'Camaras de fotos y video.'),
	 (2, 'Sonido', 'https://res.cloudinary.com/wilsondelcanto-dev/image/upload/v1717019008/categories/p4imbfvzytianq3rjsqx.jpg', 'Equipos de sonido.'),
	 (3, 'Luces', 'https://res.cloudinary.com/wilsondelcanto-dev/image/upload/v1717019028/categories/pfoeqmaypxsh45debsju.jpg', 'Luces para eventos.'),
	 (4, 'Accesorios', 'https://res.cloudinary.com/wilsondelcanto-dev/image/upload/v1717018983/categories/l0zanig5xcmuz3crdiex.jpg', 'Accesorios para eventos.');


-- AGREGAR USUARIOS ADMINISTRADORES
INSERT INTO users (id, city, image_url, name, lastname, phone, email, password, role_id) VALUES 
    (2,'Chile', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png', 'Wilson', 'Del Canto', '954205188', 'wilson@visualstudioservice.com', '$2a$10$b.xi3jnqXIaFK6rG7rXP.eVYXB4bv5TusLi8LJsRqFLwTLwrUalsa', 1),
    (3,'Chile', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png', 'Katherine', 'Henriquez ', '999931269', 'katherine@visualstudioservice.com', '$2a$10$b.xi3jnqXIaFK6rG7rXP.eVYXB4bv5TusLi8LJsRqFLwTLwrUalsa', 1),
    (4,'Chile', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png', 'Christian', 'Valeria', '952589522', 'christian@visualstudioservice.com', '$2a$10$b.xi3jnqXIaFK6rG7rXP.eVYXB4bv5TusLi8LJsRqFLwTLwrUalsa', 1),
    (5,'Colombia', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png', 'Eliana', 'Sanchez', '3213811316', 'eliana@visualstudioservice.com', '$2a$10$b.xi3jnqXIaFK6rG7rXP.eVYXB4bv5TusLi8LJsRqFLwTLwrUalsa', 1),
    (6,'Colombia', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png', 'Paula', 'Palacios', '3214561898', 'paula@visualstudioservice.com', '$2a$10$b.xi3jnqXIaFK6rG7rXP.eVYXB4bv5TusLi8LJsRqFLwTLwrUalsa', 1),
    (7,'Argentina', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png', 'Sofia', 'Brugo', '91168880105', 'sofia@visualstudioservice.com', '$2a$10$b.xi3jnqXIaFK6rG7rXP.eVYXB4bv5TusLi8LJsRqFLwTLwrUalsa', 1),
    (8,'Argentina', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png', 'Camilo', 'Patiño', '91136797208', 'camilo@visualstudioservice.com', '$2a$10$b.xi3jnqXIaFK6rG7rXP.eVYXB4bv5TusLi8LJsRqFLwTLwrUalsa', 1),
    (9,'Argentina', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png', 'Leonardo', 'Ruiz', '91160226056', 'leonardo@visualstudioservice.com', '$2a$10$b.xi3jnqXIaFK6rG7rXP.eVYXB4bv5TusLi8LJsRqFLwTLwrUalsa', 1),
    (10,'Argentina', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png', 'Andrés', 'Pistone', '93464627281', 'andres@visualstudioservice.com', '$2a$10$b.xi3jnqXIaFK6rG7rXP.eVYXB4bv5TusLi8LJsRqFLwTLwrUalsa', 1);


-- AGREGAR PRODUCTOS
INSERT INTO products (name, description, price, stock, images, reserved, category_id) VALUES
  ('Cámara Canon EOS 5D Mark IV', 'Cámara Canon EOS 5D Mark IV', 2000, 10, '', 0, 1),
  ('Cámara Canon EOS 6D Mark II', 'Cámara Canon EOS 6D Mark II', 1500, 10, '', 0, 1),
  ('Cámara Canon EOS 7D Mark II', 'Cámara Canon EOS 7D Mark II', 1000, 10, '', 0, 1),
  ('Cámara Canon EOS 80D', 'Cámara Canon EOS 80D', 800, 10, '', 0, 1),
  ('Cámara Canon EOS 90D', 'Cámara Canon EOS 90D', 700, 10, '', 0, 1),
  ('Cámara Canon EOS 5D Mark IV', 'Cámara Canon EOS 5D Mark IV', 2000, 10, '', 0, 1);