package com.advancedprogramming.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.advancedprogramming.api.models.User;
import com.advancedprogramming.api.models.UserRepository;

@Controller
@RequestMapping(path = "/demo")
public class MainController {
  @Autowired
  private UserRepository userRepository;

  @PostMapping(path = "/add")
  public @ResponseBody String addNewUser() {
    User n = new User();
    n.setName("ezaeaaze");
    n.setEmail("email");
    userRepository.save(n);
    System.out.println("Saved");
    return "Saved";
  }

  @GetMapping(path = "/all")
  public @ResponseBody Iterable<User> getAllUsers() {
    return userRepository.findAll();
  }
}