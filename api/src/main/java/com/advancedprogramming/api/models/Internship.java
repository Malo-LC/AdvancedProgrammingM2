package com.advancedprogramming.api.models;

import com.advancedprogramming.api.models.bean.YearEnum;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Getter
public class Internship {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Enumerated(EnumType.STRING)
    private YearEnum promotionYear;
    private Integer year;
    private String title;
    private Boolean isClosed = false;
    private LocalDate EndDate;

    public void setId(Integer id) {
        this.id = id;
    }

    public void setPromotionYear(YearEnum promotionYear) {
        this.promotionYear = promotionYear;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setIsClosed(Boolean isClosed) {
        this.isClosed = isClosed;
    }

    public void setEndDate(LocalDate endDate) {
        EndDate = endDate;
    }

    @OneToMany(mappedBy = "internship")
    private List<Report> reports;
}
