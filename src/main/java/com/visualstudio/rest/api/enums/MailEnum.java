package com.visualstudio.rest.api.enums;

public enum MailEnum {

VALIDACION_CUENTA("Validacion de Cuenta"),
BIENVENIDA("Bienvenido(a) a la plataforma"),
RESERVA("Reserva creada");

private final String mensaje;

MailEnum(String mensaje) {
    this.mensaje = mensaje;}

@Override
public String toString() {
    return this.mensaje;}


}
