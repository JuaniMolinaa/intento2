package com.example.ensolversChallenge.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.example.ensolversChallenge.Enum.State;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "note")
public class Note {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "title", nullable = false, length = 150)
	private String title;

	@Column(name = "body", nullable = false, length = 800)
	private String body;
	
	@Column(name = "state", nullable = false)
	@Enumerated(EnumType.STRING)
	private State state;

	@DateTimeFormat(pattern = "dd-MM-yyyy")
	@Column(name = "datetime")
	private Date datetime;
}
