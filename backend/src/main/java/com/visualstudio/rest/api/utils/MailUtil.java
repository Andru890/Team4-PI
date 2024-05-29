/*

package com.visualstudio.rest.api.utils;

import com.visualstudio.rest.api.dto.Entrada.ReservationEntradaDto;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Value;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

public class MailUtil {

    @Value ("${frontend.url}")
    private String frontendUrl;

    private final ClassLoader classLoader = getClass().getClassLoader();

public MailUtil () {}

public String ValidationEmail(String url, String name) throws IOException {
    String template = new String(classLoader.getResourceAsStream("templates/validacion.html").readAllBytes(),
            StandardCharsets.UTF_8);

    Document doc = Jsoup.parse(template, "UTF-8");

    Elements homeLinks = doc.getElementsByClass("home-link");
    homeLinks.attr("href", frontendUrl);

    Element mainTitle = doc.getElementById("main-title");
    if (mainTitle == null) {
        throw new IOException("No se ha encontrado el elemento con id main-title");
    }
    mainTitle.after("<h2 style='font-size: 30px'>¡Hola " + name + "!</h2>");

    Element validateLink = doc.getElementById("validate-link");
    if (validateLink == null) {
        throw new IOException("No se ha encontrado el elemento con id validate-link");
    }
    validateLink.attr("href", url);

    return doc.toString();}

    public String WelcomeEmail (String user) throws IOException {
        String template = new String(classLoader.getResourceAsStream("templates/bienvenida.html").readAllBytes(),
                StandardCharsets.UTF_8);
        Document doc = Jsoup.parse(template, "UTF-8");

        Element mainTitle = doc.getElementById("main-title");
        if (mainTitle == null) {
            throw new IOException("No se ha encontrado el elemento con id main-title");
        }
        mainTitle.after("<h2 style='font-size: 30px'>¡Hola " + user + "!</h2>");

        return doc.toString();
    }

    public String ReservationEmail(ReservationEntradaDto reservationEntradaDto) throws Exception {
        String template = new String(classLoader.getResourceAsStream("templates/turno.html").readAllBytes(),
                StandardCharsets.UTF_8);
        Document doc = Jsoup.parse(template, "UTF-8");

        Element userName = doc.getElementById("userName");
        userName.after("<span>" + reservationEntradaDto.getUser()+"</span> <br>");


        Element dateIn = doc.getElementById("dateIn");
        dateIn.after("<span>" + reservationEntradaDto.getDateIn() + "</span> <br>");

        Element dateOut = doc.getElementById("dateOut");
        dateOut.after("<span>" + reservationEntradaDto.getDateOut() + "</span> <br>");

        return doc.toString();
    }
}
/**/
