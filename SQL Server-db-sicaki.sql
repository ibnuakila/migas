/* ---------------------------------------------------- */
/*  Generated by Enterprise Architect Version 15.2 		*/
/*  Created On : 25-Aug-2023 2:50:41 PM 				*/
/*  DBMS       : SQL Server 2012 						*/
/* ---------------------------------------------------- */

/* Drop Foreign Key Constraints */

IF EXISTS (SELECT 1 FROM dbo.sysobjects WHERE id = object_id(N'[FK_Indikator_Level]') AND OBJECTPROPERTY(id, N'IsForeignKey') = 1) 
ALTER TABLE [Indikator] DROP CONSTRAINT [FK_Indikator_Level]
GO

IF EXISTS (SELECT 1 FROM dbo.sysobjects WHERE id = object_id(N'[FK_Indikator_Satuan]') AND OBJECTPROPERTY(id, N'IsForeignKey') = 1) 
ALTER TABLE [Indikator] DROP CONSTRAINT [FK_Indikator_Satuan]
GO

IF EXISTS (SELECT 1 FROM dbo.sysobjects WHERE id = object_id(N'[FK_IndikatorPeriode_Indikator]') AND OBJECTPROPERTY(id, N'IsForeignKey') = 1) 
ALTER TABLE [IndikatorPeriode] DROP CONSTRAINT [FK_IndikatorPeriode_Indikator]
GO

IF EXISTS (SELECT 1 FROM dbo.sysobjects WHERE id = object_id(N'[FK_IndikatorPeriode_Periode]') AND OBJECTPROPERTY(id, N'IsForeignKey') = 1) 
ALTER TABLE [IndikatorPeriode] DROP CONSTRAINT [FK_IndikatorPeriode_Periode]
GO

IF EXISTS (SELECT 1 FROM dbo.sysobjects WHERE id = object_id(N'[FK_IndikatorPeriode_PIC]') AND OBJECTPROPERTY(id, N'IsForeignKey') = 1) 
ALTER TABLE [IndikatorPeriode] DROP CONSTRAINT [FK_IndikatorPeriode_PIC]
GO

IF EXISTS (SELECT 1 FROM dbo.sysobjects WHERE id = object_id(N'[FK_LaporanCapaian_IndikatorPeriode]') AND OBJECTPROPERTY(id, N'IsForeignKey') = 1) 
ALTER TABLE [LaporanCapaian] DROP CONSTRAINT [FK_LaporanCapaian_IndikatorPeriode]
GO

IF EXISTS (SELECT 1 FROM dbo.sysobjects WHERE id = object_id(N'[FK_LaporanCapaian_KategoriKinerja]') AND OBJECTPROPERTY(id, N'IsForeignKey') = 1) 
ALTER TABLE [LaporanCapaian] DROP CONSTRAINT [FK_LaporanCapaian_KategoriKinerja]
GO

IF EXISTS (SELECT 1 FROM dbo.sysobjects WHERE id = object_id(N'[FK_LaporanCapaian_Periode]') AND OBJECTPROPERTY(id, N'IsForeignKey') = 1) 
ALTER TABLE [LaporanCapaian] DROP CONSTRAINT [FK_LaporanCapaian_Periode]
GO

IF EXISTS (SELECT 1 FROM dbo.sysobjects WHERE id = object_id(N'[FK_LaporanCapaian_Triwulan]') AND OBJECTPROPERTY(id, N'IsForeignKey') = 1) 
ALTER TABLE [LaporanCapaian] DROP CONSTRAINT [FK_LaporanCapaian_Triwulan]
GO

/* Drop Tables */

IF EXISTS (SELECT 1 FROM dbo.sysobjects WHERE id = object_id(N'[Indikator]') AND OBJECTPROPERTY(id, N'IsUserTable') = 1) 
DROP TABLE [Indikator]
GO

IF EXISTS (SELECT 1 FROM dbo.sysobjects WHERE id = object_id(N'[IndikatorPeriode]') AND OBJECTPROPERTY(id, N'IsUserTable') = 1) 
DROP TABLE [IndikatorPeriode]
GO

IF EXISTS (SELECT 1 FROM dbo.sysobjects WHERE id = object_id(N'[KategoriKinerja]') AND OBJECTPROPERTY(id, N'IsUserTable') = 1) 
DROP TABLE [KategoriKinerja]
GO

IF EXISTS (SELECT 1 FROM dbo.sysobjects WHERE id = object_id(N'[LaporanCapaian]') AND OBJECTPROPERTY(id, N'IsUserTable') = 1) 
DROP TABLE [LaporanCapaian]
GO

IF EXISTS (SELECT 1 FROM dbo.sysobjects WHERE id = object_id(N'[Level]') AND OBJECTPROPERTY(id, N'IsUserTable') = 1) 
DROP TABLE [Level]
GO

IF EXISTS (SELECT 1 FROM dbo.sysobjects WHERE id = object_id(N'[Periode]') AND OBJECTPROPERTY(id, N'IsUserTable') = 1) 
DROP TABLE [Periode]
GO

IF EXISTS (SELECT 1 FROM dbo.sysobjects WHERE id = object_id(N'[PIC]') AND OBJECTPROPERTY(id, N'IsUserTable') = 1) 
DROP TABLE [PIC]
GO

IF EXISTS (SELECT 1 FROM dbo.sysobjects WHERE id = object_id(N'[Satuan]') AND OBJECTPROPERTY(id, N'IsUserTable') = 1) 
DROP TABLE [Satuan]
GO

IF EXISTS (SELECT 1 FROM dbo.sysobjects WHERE id = object_id(N'[Triwulan]') AND OBJECTPROPERTY(id, N'IsUserTable') = 1) 
DROP TABLE [Triwulan]
GO

/* Create Tables */

CREATE TABLE [Indikator]
(
	[Id] int NOT NULL,
	[NamaIndikator] varchar(500),
	[IdSatuan] int,
	[IdLevel] int
)
GO

CREATE TABLE [IndikatorPeriode]
(
	[Id] int NOT NULL IDENTITY (1, 1),
	[IdIndikator] int,
	[IdPeriode] int,
	[Target] float,
	[IdPIC] int
)
GO

CREATE TABLE [KategoriKinerja]
(
	[Id] int NOT NULL IDENTITY (1, 1),
	[NamaKategoriKinerja] varchar(50)
)
GO

CREATE TABLE [LaporanCapaian]
(
	[Id] int NOT NULL IDENTITY (1, 1),
	[IdIndikatorPeriode] int,
	[IdTriwulan] int,
	[Realisasi] float,
	[Kinerja] float,
	[IdPeriode] int,
	[IdKategoriKinerja] int,
	[SumberData] text
)
GO

CREATE TABLE [Level]
(
	[Id] int NOT NULL,
	[NamaLevel] varchar(500)
)
GO

CREATE TABLE [Periode]
(
	[Id] int NOT NULL IDENTITY (1, 1),
	[Periode] numeric(18),
	[Status] varchar(50)
)
GO

CREATE TABLE [PIC]
(
	[Id] int NOT NULL IDENTITY (1, 1),
	[NamaPIC] varchar(500),
	[Keterangan] text
)
GO

CREATE TABLE [Satuan]
(
	[Id] int NOT NULL IDENTITY (1, 1),
	[NamaSatuan] varchar(500)
)
GO

CREATE TABLE [Triwulan]
(
	[Id] int NOT NULL IDENTITY (1, 1),
	[Triwulan] varchar(50)
)
GO

/* Create Primary Keys, Indexes, Uniques, Checks */

ALTER TABLE [Indikator] 
 ADD CONSTRAINT [PK_Indikator]
	PRIMARY KEY CLUSTERED ([Id] ASC)
GO

CREATE NONCLUSTERED INDEX [IXFK_Indikator_Level] 
 ON [Indikator] ([IdLevel] ASC)
GO

CREATE NONCLUSTERED INDEX [IXFK_Indikator_Satuan] 
 ON [Indikator] ([IdSatuan] ASC)
GO

ALTER TABLE [IndikatorPeriode] 
 ADD CONSTRAINT [PK_IndikatorPeriode]
	PRIMARY KEY CLUSTERED ([Id] ASC)
GO

CREATE NONCLUSTERED INDEX [IXFK_IndikatorPeriode_Indikator] 
 ON [IndikatorPeriode] ([IdIndikator] ASC)
GO

CREATE NONCLUSTERED INDEX [IXFK_IndikatorPeriode_Periode] 
 ON [IndikatorPeriode] ([IdPeriode] ASC)
GO

CREATE NONCLUSTERED INDEX [IXFK_IndikatorPeriode_PIC] 
 ON [IndikatorPeriode] ([IdPIC] ASC)
GO

ALTER TABLE [KategoriKinerja] 
 ADD CONSTRAINT [PK_KategoriKinerja]
	PRIMARY KEY CLUSTERED ([Id] ASC)
GO

ALTER TABLE [LaporanCapaian] 
 ADD CONSTRAINT [PK_LaporanCapaian]
	PRIMARY KEY CLUSTERED ([Id] ASC)
GO

CREATE NONCLUSTERED INDEX [IXFK_LaporanCapaian_IndikatorPeriode] 
 ON [LaporanCapaian] ([IdIndikatorPeriode] ASC)
GO

CREATE NONCLUSTERED INDEX [IXFK_LaporanCapaian_KategoriKinerja] 
 ON [LaporanCapaian] ([IdKategoriKinerja] ASC)
GO

CREATE NONCLUSTERED INDEX [IXFK_LaporanCapaian_Periode] 
 ON [LaporanCapaian] ([IdPeriode] ASC)
GO

CREATE NONCLUSTERED INDEX [IXFK_LaporanCapaian_Triwulan] 
 ON [LaporanCapaian] ([IdTriwulan] ASC)
GO

ALTER TABLE [Level] 
 ADD CONSTRAINT [PK_Level]
	PRIMARY KEY CLUSTERED ([Id] ASC)
GO

ALTER TABLE [Periode] 
 ADD CONSTRAINT [PK_Periode]
	PRIMARY KEY CLUSTERED ([Id] ASC)
GO

ALTER TABLE [PIC] 
 ADD CONSTRAINT [PK_PIC]
	PRIMARY KEY CLUSTERED ([Id] ASC)
GO

ALTER TABLE [Satuan] 
 ADD CONSTRAINT [PK_Satuan]
	PRIMARY KEY CLUSTERED ([Id] ASC)
GO

ALTER TABLE [Triwulan] 
 ADD CONSTRAINT [PK_Triwulan]
	PRIMARY KEY CLUSTERED ([Id] ASC)
GO

/* Create Foreign Key Constraints */

ALTER TABLE [Indikator] ADD CONSTRAINT [FK_Indikator_Level]
	FOREIGN KEY ([IdLevel]) REFERENCES [Level] ([Id]) ON DELETE No Action ON UPDATE No Action
GO

ALTER TABLE [Indikator] ADD CONSTRAINT [FK_Indikator_Satuan]
	FOREIGN KEY ([IdSatuan]) REFERENCES [Satuan] ([Id]) ON DELETE No Action ON UPDATE No Action
GO

ALTER TABLE [IndikatorPeriode] ADD CONSTRAINT [FK_IndikatorPeriode_Indikator]
	FOREIGN KEY ([IdIndikator]) REFERENCES [Indikator] ([Id]) ON DELETE No Action ON UPDATE No Action
GO

ALTER TABLE [IndikatorPeriode] ADD CONSTRAINT [FK_IndikatorPeriode_Periode]
	FOREIGN KEY ([IdPeriode]) REFERENCES [Periode] ([Id]) ON DELETE No Action ON UPDATE No Action
GO

ALTER TABLE [IndikatorPeriode] ADD CONSTRAINT [FK_IndikatorPeriode_PIC]
	FOREIGN KEY ([IdPIC]) REFERENCES [PIC] ([Id]) ON DELETE No Action ON UPDATE No Action
GO

ALTER TABLE [LaporanCapaian] ADD CONSTRAINT [FK_LaporanCapaian_IndikatorPeriode]
	FOREIGN KEY ([IdIndikatorPeriode]) REFERENCES [IndikatorPeriode] ([Id]) ON DELETE No Action ON UPDATE No Action
GO

ALTER TABLE [LaporanCapaian] ADD CONSTRAINT [FK_LaporanCapaian_KategoriKinerja]
	FOREIGN KEY ([IdKategoriKinerja]) REFERENCES [KategoriKinerja] ([Id]) ON DELETE No Action ON UPDATE No Action
GO

ALTER TABLE [LaporanCapaian] ADD CONSTRAINT [FK_LaporanCapaian_Periode]
	FOREIGN KEY ([IdPeriode]) REFERENCES [Periode] ([Id]) ON DELETE No Action ON UPDATE No Action
GO

ALTER TABLE [LaporanCapaian] ADD CONSTRAINT [FK_LaporanCapaian_Triwulan]
	FOREIGN KEY ([IdTriwulan]) REFERENCES [Triwulan] ([Id]) ON DELETE No Action ON UPDATE No Action
GO