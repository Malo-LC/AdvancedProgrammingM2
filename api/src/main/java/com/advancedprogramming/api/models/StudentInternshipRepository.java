package com.advancedprogramming.api.models;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentInternshipRepository extends JpaRepository<StudentInternship, Integer> {

    List<StudentInternship> findAllByUserId(Integer userId);

    @Query("SELECT si FROM StudentInternship si WHERE si.tutorSchoolUser.id = ?1 or si.tutorCompanyUser.id = ?1")
    List<StudentInternship> findAllByTutorId(Integer tutorId);

}
