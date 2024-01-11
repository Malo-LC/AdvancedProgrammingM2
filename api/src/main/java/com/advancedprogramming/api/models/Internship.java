package com.advancedprogramming.api.models;

import com.advancedprogramming.api.models.bean.YearEnum;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UuidGenerator;

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

    private YearEnum year;
    private LocalDate deadline;

    public void setId(Integer id) {
        this.id = id;
    }

    public void setYear(YearEnum year) {
        this.year = year;
    }

    public void setDeadline(LocalDate deadline) {
        this.deadline = deadline;
    }

    @ManyToMany
    @JoinTable(
        name = "internship_report",
        joinColumns = @JoinColumn(name = "internship_id", referencedColumnName = "id", table = "internship"),
        inverseJoinColumns = @JoinColumn(name = "report_id", referencedColumnName = "id", table = "report"))
    @JsonIgnore
    private List<Report> reports;

    @OneToMany(mappedBy = "internship")
    private List<Submit> submits;
}