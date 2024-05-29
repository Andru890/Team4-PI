package com.visualstudio.rest.api.dto.Salida;

import com.visualstudio.rest.api.models.entities.Reservation;

import com.visualstudio.rest.api.models.entities.Role;
import jakarta.persistence.*;

import java.util.List;

public class UserSalidaDto {

    private Long id;
    private String name;
    private String mobile;
    private String address;
    private String email;
    private String password;
    private String city;
    private Role rol;
    private List<Reservation> reservations;

    public UserSalidaDto() {
    }

    public UserSalidaDto(Long id, String name, String mobile, String address, String email, String password, String city, Role rol, List<Reservation> reservations) {
        this.id = id;
        this.name = name;
        this.mobile = mobile;
        this.address = address;
        this.email = email;
        this.password = password;
        this.city = city;
        this.rol = rol;
        this.reservations = reservations;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public Role getRol() {
        return rol;
    }

    public void setRole(Role rol) {
        this.rol = rol;
    }

    public List<Reservation> getReservations() {
        return reservations;
    }

    public void setReservations(List<Reservation> reservations) {
        this.reservations = reservations;
    }
}
