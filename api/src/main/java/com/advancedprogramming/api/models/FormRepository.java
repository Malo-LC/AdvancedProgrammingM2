package com.advancedprogramming.api.models;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FormRepository extends JpaRepository<Form, Integer> {

    @Override
    List<Form> findAll(Sort S);
}
