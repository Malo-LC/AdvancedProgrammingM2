package com.advancedprogramming.api.models;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InternshipRepository extends JpaRepository<Internship, String> {


}
