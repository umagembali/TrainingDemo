USE [master]
GO

CREATE DATABASE TrainingInfo
GO

USE TrainingInfo
GO

CREATE TABLE dbo.Trainings
(
	[Id]	INT IDENTITY(1,1) PRIMARY KEY,
	[Name]	VARCHAR(100) NOT NULL,
	[Start_Date] DATETIME NOT NULL,
	[End_Date] DATETIME NOT NULL,
	[Confirmed]	BIT DEFAULT 0,  --0 INDICATES PENDING, 1 INDICATES CONFIRMED
	CONSTRAINT UK_Trainings UNIQUE ([Name], [Start_Date])
)
GO


