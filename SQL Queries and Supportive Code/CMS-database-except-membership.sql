USE [CMS_webAPIdb]
GO
/****** Object:  FullTextCatalog [CMS_webAPIdb_Catalog]    Script Date: 8/15/2016 9:16:12 PM ******/
CREATE FULLTEXT CATALOG [CMS_webAPIdb_Catalog]WITH ACCENT_SENSITIVITY = ON
AS DEFAULT

GO
/****** Object:  UserDefinedTableType [dbo].[QuestionCategoryList]    Script Date: 8/15/2016 9:16:12 PM ******/
CREATE TYPE [dbo].[QuestionCategoryList] AS TABLE(
	[QuestionID] [int] NULL,
	[QuestionCategoryID] [varchar](100) NULL
)
GO
/****** Object:  UserDefinedTableType [dbo].[QuestionCompetitiveExaminationsList]    Script Date: 8/15/2016 9:16:12 PM ******/
CREATE TYPE [dbo].[QuestionCompetitiveExaminationsList] AS TABLE(
	[QuestionID] [int] NULL,
	[CompetitiveExaminationID] [varchar](100) NULL
)
GO
/****** Object:  UserDefinedTableType [dbo].[QuestionExaminationsList]    Script Date: 8/15/2016 9:16:12 PM ******/
CREATE TYPE [dbo].[QuestionExaminationsList] AS TABLE(
	[QuestionID] [int] NULL,
	[ExaminationID] [varchar](100) NULL
)
GO
/****** Object:  UserDefinedTableType [dbo].[QuestionStandardsList]    Script Date: 8/15/2016 9:16:12 PM ******/
CREATE TYPE [dbo].[QuestionStandardsList] AS TABLE(
	[QuestionID] [int] NULL,
	[StandardID] [varchar](100) NULL
)
GO
/****** Object:  UserDefinedTableType [dbo].[QuestionSubjectsList]    Script Date: 8/15/2016 9:16:12 PM ******/
CREATE TYPE [dbo].[QuestionSubjectsList] AS TABLE(
	[QuestionID] [int] NULL,
	[SubjectID] [varchar](100) NULL
)
GO
/****** Object:  StoredProcedure [dbo].[SP_CompetitiveExaminations_DELETE]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_CompetitiveExaminations_DELETE] (
@original_CompetitiveExaminationID VARCHAR(100),
@original_Description VARCHAR(500)
)
AS
BEGIN
DELETE FROM CompetitiveExaminations
 WHERE
CompetitiveExaminationID=@original_CompetitiveExaminationID AND
((Description=@original_Description) OR (Description IS NULL AND @original_Description IS NULL))
END
GO
/****** Object:  StoredProcedure [dbo].[SP_CompetitiveExaminations_INSERT]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_CompetitiveExaminations_INSERT] (
@CompetitiveExaminationID VARCHAR(100),
@Description VARCHAR(500)
)
AS
BEGIN
INSERT INTO CompetitiveExaminations(CompetitiveExaminationID, Description) VALUES(@CompetitiveExaminationID, @Description)
END
GO
/****** Object:  StoredProcedure [dbo].[SP_CompetitiveExaminations_SELECT]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_CompetitiveExaminations_SELECT]
AS
BEGIN
SELECT CompetitiveExaminationID, Description FROM CompetitiveExaminations
END


GO
/****** Object:  StoredProcedure [dbo].[SP_CompetitiveExaminations_SELECT_By_CompetitiveExaminationID]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_CompetitiveExaminations_SELECT_By_CompetitiveExaminationID] (
@CompetitiveExaminationID VARCHAR(100)
)
AS
BEGIN
SELECT CompetitiveExaminationID, Description FROM CompetitiveExaminations Where CompetitiveExaminationID=@CompetitiveExaminationID
END
GO
/****** Object:  StoredProcedure [dbo].[SP_CompetitiveExaminations_UPDATE]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_CompetitiveExaminations_UPDATE] (
@CompetitiveExaminationID VARCHAR(100),
@Description VARCHAR(500),
@original_CompetitiveExaminationID VARCHAR(100),
@original_Description VARCHAR(500)
)
AS
BEGIN
UPDATE CompetitiveExaminations SET CompetitiveExaminationID=@CompetitiveExaminationID, Description=@Description
 WHERE
CompetitiveExaminationID=@original_CompetitiveExaminationID AND
((Description=@original_Description) OR (Description IS NULL AND @original_Description IS NULL))
END
GO
/****** Object:  StoredProcedure [dbo].[SP_Examinations_DELETE]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_Examinations_DELETE] (
@original_ExaminationID VARCHAR(100),
@original_Description VARCHAR(500)
)
AS
BEGIN
DELETE FROM Examinations
 WHERE
ExaminationID=@original_ExaminationID AND
((Description=@original_Description) OR (Description IS NULL AND @original_Description IS NULL))
END
GO
/****** Object:  StoredProcedure [dbo].[SP_Examinations_INSERT]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_Examinations_INSERT] (
@ExaminationID VARCHAR(100),
@Description VARCHAR(500)
)
AS
BEGIN
INSERT INTO Examinations(ExaminationID, Description) VALUES(@ExaminationID, @Description)
END

GO
/****** Object:  StoredProcedure [dbo].[SP_Examinations_SELECT]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_Examinations_SELECT]
AS
BEGIN
SELECT ExaminationID, Description FROM Examinations
END
GO
/****** Object:  StoredProcedure [dbo].[SP_Examinations_SELECT_BY_ExaminationID]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_Examinations_SELECT_BY_ExaminationID]
(
@ExaminationID VARCHAR(100)
)
AS
BEGIN
SELECT ExaminationID, Description FROM Examinations WHERE ExaminationID=@ExaminationID
END
GO
/****** Object:  StoredProcedure [dbo].[SP_Examinations_UPDATE]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_Examinations_UPDATE] (
@ExaminationID VARCHAR(100),
@Description VARCHAR(500),
@original_ExaminationID VARCHAR(100),
@original_Description VARCHAR(500)
)
AS
BEGIN
UPDATE Examinations SET ExaminationID=@ExaminationID, Description=@Description
 WHERE
ExaminationID=@original_ExaminationID AND
((Description=@original_Description) OR (Description IS NULL AND @original_Description IS NULL))
END
GO
/****** Object:  StoredProcedure [dbo].[SP_News_DELETE]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_News_DELETE] (
@original_NewsID INT,
@original_Title VARCHAR(500),
@original_Description VARCHAR(MAX),
@original_Broadcast BIT,
@original_CreatedDateTime DATETIME,
@original_EditedDateTime DATETIME
)
AS
BEGIN
DELETE FROM News
 WHERE
NewsID=@original_NewsID
END

GO
/****** Object:  StoredProcedure [dbo].[SP_News_INSERT]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_News_INSERT] (
@NewsID INT OUTPUT,
@Title VARCHAR(500),
@Description VARCHAR(MAX),
@Broadcast BIT,
@CreatedDateTime DATETIME,
@EditedDateTime DATETIME
)
AS
BEGIN
set @CreatedDateTime=getdate();
set @EditedDateTime=getdate();
INSERT INTO News(Title, Description, Broadcast, CreatedDateTime, EditedDateTime) VALUES(@Title, @Description, @Broadcast, @CreatedDateTime, @EditedDateTime);
Select  @NewsID =SCOPE_IDENTITY();
END

GO
/****** Object:  StoredProcedure [dbo].[SP_News_SELECT_By_Broadcast]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_News_SELECT_By_Broadcast] (
@Broadcast BIT
)
AS
BEGIN
SELECT NewsID, Title, Description, Broadcast, CreatedDateTime, EditedDateTime FROM News Where Broadcast=@Broadcast ORDER BY EditedDateTime DESC;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_News_SELECT_By_NewsID]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SP_News_SELECT_By_NewsID] (
@NewsID INT
)
AS
BEGIN
SELECT NewsID, Title, Description, Broadcast, CreatedDateTime, EditedDateTime FROM News  Where NewsID=@NewsID;
END


GO
/****** Object:  StoredProcedure [dbo].[SP_News_SELECT_FULLTEXT]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_News_SELECT_FULLTEXT] (
@SearchString VARCHAR(500)
)
AS
BEGIN
set @SearchString=ltrim(rtrim(@SearchString));
set @SearchString=Replace(@SearchString,' ', ' OR ');
SELECT NewsID, Title, Description, Broadcast, CreatedDateTime, EditedDateTime FROM News  Where contains((Title,Description),@SearchString) ORDER BY EditedDateTime DESC;
END


GO
/****** Object:  StoredProcedure [dbo].[SP_News_SELECT_FULLTEXT_By_Broadcast]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_News_SELECT_FULLTEXT_By_Broadcast] (
@SearchString VARCHAR(500),
@Broadcast BIT
)
AS
BEGIN
set @SearchString=ltrim(rtrim(@SearchString));
set @SearchString=Replace(@SearchString,' ', ' OR ');
SELECT NewsID, Title, Description, Broadcast, CreatedDateTime, EditedDateTime FROM News  Where Broadcast=@Broadcast AND  contains((Title,Description),@SearchString) ORDER BY EditedDateTime DESC;
END


GO
/****** Object:  StoredProcedure [dbo].[SP_News_UPDATE]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_News_UPDATE] (
@NewsID INT,
@Title VARCHAR(500),
@Description VARCHAR(MAX),
@Broadcast BIT,
@CreatedDateTime DATETIME,
@EditedDateTime DATETIME,
@original_NewsID INT,
@original_Title VARCHAR(500),
@original_Description VARCHAR(MAX),
@original_Broadcast BIT,
@original_CreatedDateTime DATETIME,
@original_EditedDateTime DATETIME
)
AS
BEGIN
set @EditedDateTime=getdate();
UPDATE News SET Title=@Title, Description=@Description, Broadcast=@Broadcast, CreatedDateTime=@CreatedDateTime, EditedDateTime=@EditedDateTime
 WHERE
NewsID=@original_NewsID
END


GO
/****** Object:  StoredProcedure [dbo].[SP_PaperCategories_DELETE]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/* DELETE SQL PROCEDURES */
CREATE PROCEDURE [dbo].[SP_PaperCategories_DELETE] (
@original_PaperCategoryID VARCHAR(100),
@original_Description VARCHAR(500)
)
AS
BEGIN
DELETE FROM PaperCategories
 WHERE
PaperCategoryID=@original_PaperCategoryID AND
((Description=@original_Description) OR (Description IS NULL AND @original_Description IS NULL))
END


GO
/****** Object:  StoredProcedure [dbo].[SP_PaperCategories_INSERT]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/* INSERT SQL PROCEDURES */
CREATE PROCEDURE [dbo].[SP_PaperCategories_INSERT] (
@PaperCategoryID VARCHAR(100),
@Description VARCHAR(500)
)
AS
BEGIN
INSERT INTO PaperCategories(PaperCategoryID, Description) VALUES(@PaperCategoryID, @Description)
END

GO
/****** Object:  StoredProcedure [dbo].[SP_PaperCategories_SELECT]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/* SELECT SQL PROCEDURES */
CREATE PROCEDURE [dbo].[SP_PaperCategories_SELECT]
AS
BEGIN
SELECT PaperCategoryID, Description FROM PaperCategories
END

GO
/****** Object:  StoredProcedure [dbo].[SP_PaperCategories_SELECT_By_PaperCategoryID]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/* SELECT SQL PROCEDURES */
CREATE PROCEDURE [dbo].[SP_PaperCategories_SELECT_By_PaperCategoryID] (
@PaperCategoryID VARCHAR(100)
)
AS
BEGIN
SELECT PaperCategoryID, Description FROM PaperCategories WHERE PaperCategoryID=@PaperCategoryID
END

GO
/****** Object:  StoredProcedure [dbo].[SP_PaperCategories_UPDATE]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/* UPDATE SQL PROCEDURES */
CREATE PROCEDURE [dbo].[SP_PaperCategories_UPDATE] (
@PaperCategoryID VARCHAR(100),
@Description VARCHAR(500),
@original_PaperCategoryID VARCHAR(100),
@original_Description VARCHAR(500)
)
AS
BEGIN
UPDATE PaperCategories SET PaperCategoryID=@PaperCategoryID, Description=@Description
 WHERE
PaperCategoryID=@original_PaperCategoryID AND
((Description=@original_Description) OR (Description IS NULL AND @original_Description IS NULL))
END

GO
/****** Object:  StoredProcedure [dbo].[SP_QuestionCategories_DELETE]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/* DELETE SQL PROCEDURES */
CREATE PROCEDURE [dbo].[SP_QuestionCategories_DELETE] (
@original_QuestionCategoryID VARCHAR(100),
@original_Description VARCHAR(500)
)
AS
BEGIN
DELETE FROM QuestionCategories
 WHERE
QuestionCategoryID=@original_QuestionCategoryID AND
((Description=@original_Description) OR (Description IS NULL AND @original_Description IS NULL))
END


GO
/****** Object:  StoredProcedure [dbo].[SP_QuestionCategories_INSERT]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/* INSERT SQL PROCEDURES */
CREATE PROCEDURE [dbo].[SP_QuestionCategories_INSERT] (
@QuestionCategoryID VARCHAR(100),
@Description VARCHAR(500)
)
AS
BEGIN
INSERT INTO QuestionCategories(QuestionCategoryID, Description) VALUES(@QuestionCategoryID, @Description)
END

GO
/****** Object:  StoredProcedure [dbo].[SP_QuestionCategories_SELECT]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/* SELECT SQL PROCEDURES */
CREATE PROCEDURE [dbo].[SP_QuestionCategories_SELECT]
AS
BEGIN
SELECT QuestionCategoryID, Description FROM QuestionCategories
END

GO
/****** Object:  StoredProcedure [dbo].[SP_QuestionCategories_SELECT_By_QuestionCategoryID]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SP_QuestionCategories_SELECT_By_QuestionCategoryID] (
@QuestionCategoryID VARCHAR(100)
)
AS
BEGIN
SELECT QuestionCategoryID, Description FROM QuestionCategories WHERE QuestionCategoryID=@QuestionCategoryID
END


GO
/****** Object:  StoredProcedure [dbo].[SP_QuestionCategories_UPDATE]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/* UPDATE SQL PROCEDURES */
CREATE PROCEDURE [dbo].[SP_QuestionCategories_UPDATE] (
@QuestionCategoryID VARCHAR(100),
@Description VARCHAR(500),
@original_QuestionCategoryID VARCHAR(100),
@original_Description VARCHAR(500)
)
AS
BEGIN
UPDATE QuestionCategories SET QuestionCategoryID=@QuestionCategoryID, Description=@Description
 WHERE
QuestionCategoryID=@original_QuestionCategoryID AND
((Description=@original_Description) OR (Description IS NULL AND @original_Description IS NULL))
END

GO
/****** Object:  StoredProcedure [dbo].[SP_QuestionCompetitiveExaminations_SELECT_By_QuestionID_ALL]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_QuestionCompetitiveExaminations_SELECT_By_QuestionID_ALL] (
@QuestionID INT
)
AS
BEGIN
select Cast(1 as BIT) as 'IsSelected' , CompetitiveExaminationID from QuestionCompetitiveExaminations where QuestionID=@QuestionID
UNION
SELECT cast(0 as BIT) as 'IsSelected', CompetitiveExaminationID FROM CompetitiveExaminations where CompetitiveExaminationID NOT IN (Select CompetitiveExaminationID from QuestionCompetitiveExaminations where QuestionID=@QuestionID)
END

GO
/****** Object:  StoredProcedure [dbo].[SP_QuestionExaminations_SELECT_By_QuestionID_ALL]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_QuestionExaminations_SELECT_By_QuestionID_ALL] (
@QuestionID INT
)
AS
BEGIN
select Cast(1 as BIT) as 'IsSelected' , ExaminationID from QuestionExaminations where QuestionID=@QuestionID
UNION
SELECT cast(0 as BIT) as 'IsSelected', ExaminationID FROM Examinations where ExaminationID NOT IN (Select ExaminationID from QuestionExaminations where QuestionID=@QuestionID)
END


GO
/****** Object:  StoredProcedure [dbo].[SP_QuestionQuestionCategories_SELECT_By_QuestionID_ALL]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SP_QuestionQuestionCategories_SELECT_By_QuestionID_ALL] (
@QuestionID INT
)
AS
BEGIN
select Cast(1 as BIT) as 'IsSelected' , QuestionCategoryID from QuestionQuestionCategories where QuestionID=@QuestionID
UNION
SELECT cast(0 as BIT) as 'IsSelected', QuestionCategoryID FROM QuestionCategories where QuestionCategoryID NOT IN (Select QuestionCategoryID from QuestionQuestionCategories where QuestionID=@QuestionID)
END



GO
/****** Object:  StoredProcedure [dbo].[SP_Questions_DELETE]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_Questions_DELETE] (
@original_QuestionID INT,
@original_Question VARCHAR(900),
@original_Option1 VARCHAR(500),
@original_Option2 VARCHAR(500),
@original_Option3 VARCHAR(500),
@original_Option4 VARCHAR(500),
@original_Option5 VARCHAR(500),
@original_Remarks VARCHAR(MAX),
@QuestionID INT,
@Question VARCHAR(900),
@Option1 VARCHAR(500),
@Option2 VARCHAR(500),
@Option3 VARCHAR(500),
@Option4 VARCHAR(500),
@Option5 VARCHAR(500),
@Remarks VARCHAR(MAX)
)
AS
BEGIN

BEGIN TRANSACTION;
BEGIN TRY
DELETE FROM QuestionExaminations WHERE QuestionID=@original_QuestionID;
DELETE FROM QuestionSubjects WHERE QuestionID=@original_QuestionID;
DELETE FROM QuestionStandards WHERE QuestionID=@original_QuestionID;
DELETE FROM QuestionCompetitiveExaminations WHERE QuestionID=@original_QuestionID;
DELETE FROM QuestionQuestionCategories WHERE QuestionID=@original_QuestionID;
DELETE FROM QuestionsByUsers WHERE QuestionID=@original_QuestionID;

/* Delete Answers of This Question too here */

DELETE from Questions WHERE QuestionID=@original_QuestionID

END TRY

BEGIN CATCH
	IF @@TRANCOUNT>0
		ROLLBACK TRANSACTION;
END CATCH

IF @@TRANCOUNT>0
	COMMIT TRANSACTION;
END


GO
/****** Object:  StoredProcedure [dbo].[SP_Questions_INSERT]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_Questions_INSERT] (
@QuestionID INT OUTPUT,
@Question VARCHAR(900),
@Option1 VARCHAR(500),
@Option2 VARCHAR(500),
@Option3 VARCHAR(500),
@Option4 VARCHAR(500),
@Option5 VARCHAR(500),
@Remarks VARCHAR(MAX),
@UserID NVARCHAR(128),
@QuestionExaminationsList as QuestionExaminationsList READONLY,
@QuestionSubjectsList as QuestionSubjectsList READONLY,
@QuestionStandardsList as QuestionStandardsList READONLY,
@QuestionCompetitiveExaminationsList as QuestionCompetitiveExaminationsList READONLY,
@QuestionCategoryList as QuestionCategoryList READONLY
)
AS
BEGIN

declare @ExamList as QuestionExaminationsList;
Insert into @ExamList Select * from @QuestionExaminationsList;

declare @SubjectList as QuestionSubjectsList;
Insert into @SubjectList Select * from @QuestionSubjectsList;

declare @StandardList as QuestionStandardsList;
Insert into @StandardList Select * from @QuestionStandardsList;

declare @CExamList as QuestionCompetitiveExaminationsList;
Insert into @CExamList Select * from @QuestionCompetitiveExaminationsList;

declare @CatList as QuestionCategoryList;
Insert into @CatList Select * from @QuestionCategoryList;

BEGIN TRANSACTION;
BEGIN TRY

INSERT INTO Questions(Question, Option1, Option2, Option3, Option4, Option5, Remarks) VALUES(@Question, @Option1, @Option2, @Option3, @Option4, @Option5, @Remarks);
Select @QuestionID=SCOPE_IDENTITY();

UPDATE @ExamList SET QuestionID=@QuestionID;
Insert Into QuestionExaminations(QuestionID,ExaminationID) Select QuestionID,ExaminationID from @ExamList;

UPDATE @SubjectList SET QuestionID=@QuestionID;
Insert Into QuestionSubjects(QuestionID,SubjectID) Select QuestionID,SubjectID from @SubjectList;

UPDATE @StandardList SET QuestionID=@QuestionID;
Insert Into QuestionStandards(QuestionID,StandardID) Select QuestionID,StandardID from @StandardList;

UPDATE @CExamList SET QuestionID=@QuestionID;
Insert Into QuestionCompetitiveExaminations(QuestionID,CompetitiveExaminationID) Select QuestionID,CompetitiveExaminationID from @CExamList;

UPDATE @CatList SET QuestionID=@QuestionID;
Insert Into QuestionQuestionCategories(QuestionID,QuestionCategoryID) Select QuestionID,QuestionCategoryID from @CatList;

INSERT INTO QuestionsByUsers(UserID,QuestionID,CreatedDateTime,EditedDateTime) VALUES(@UserID,@QuestionID,getDate(),getDate());
END TRY

BEGIN CATCH
	IF @@TRANCOUNT>0
		ROLLBACK TRANSACTION;
END CATCH

IF @@TRANCOUNT>0
	COMMIT TRANSACTION;
END


GO
/****** Object:  StoredProcedure [dbo].[SP_Questions_SELECT_By_QuestionID]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_Questions_SELECT_By_QuestionID] (
@QuestionID INT
)
AS
BEGIN

declare @ExamStr VARCHAR(1000);
set @ExamStr='';
Select @ExamStr=@ExamStr +ExaminationID + '</br>' From QuestionExaminations Where QuestionID =@QuestionID;
if @ExamStr <>''
BEGIN
set @ExamStr= SubString(@ExamStr,1,Len(@ExamStr)-5);
END

declare @SubjectStr VARCHAR(1000);
set @SubjectStr='';
Select @SubjectStr=@SubjectStr +SubjectID + '</br>' From QuestionSubjects Where QuestionID =@QuestionID;
if @SubjectStr <>''
BEGIN
set @SubjectStr= SubString(@SubjectStr,1,Len(@SubjectStr)-5);
END

declare @StandardStr VARCHAR(1000);
set @StandardStr='';
Select @StandardStr=@StandardStr +StandardID + '</br>' From QuestionStandards Where QuestionID =@QuestionID;
if @StandardStr <>''
BEGIN
set @StandardStr= SubString(@StandardStr,1,Len(@StandardStr)-5);
END

declare @CExamStr VARCHAR(1000);
set @CExamStr='';
Select @CExamStr=@CExamStr +CompetitiveExaminationID + '</br>' From QuestionCompetitiveExaminations Where QuestionID =@QuestionID;
if @CExamStr <>''
BEGIN
set @CExamStr= SubString(@CExamStr,1,Len(@CExamStr)-5);
END

declare @CatStr VARCHAR(1000);
set @CatStr='';
Select @CatStr=@CatStr +QuestionCategoryID + '</br>' From QuestionQuestionCategories Where QuestionID =@QuestionID;
if @CatStr <>''
BEGIN
set @CatStr= SubString(@CatStr,1,Len(@CatStr)-5);
END



SELECT QuestionID, Question, Option1, Option2, Option3, Option4, Option5, Remarks,
 @ExamStr as 'QuestionExaminations',
 @SubjectStr as 'QuestionSubjects',
 @StandardStr as 'QuestionStandards',
 @CExamStr as 'QuestionCompetitiveExaminations',
 @CatStr as 'QuestionQuestionCategories' FROM Questions WHERE QuestionID=@QuestionID
END



GO
/****** Object:  StoredProcedure [dbo].[SP_Questions_UPDATE]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_Questions_UPDATE] (
@original_QuestionID INT,
@original_Question VARCHAR(900),
@original_Option1 VARCHAR(500),
@original_Option2 VARCHAR(500),
@original_Option3 VARCHAR(500),
@original_Option4 VARCHAR(500),
@original_Option5 VARCHAR(500),
@original_Remarks VARCHAR(MAX),
@QuestionID INT,
@Question VARCHAR(900),
@Option1 VARCHAR(500),
@Option2 VARCHAR(500),
@Option3 VARCHAR(500),
@Option4 VARCHAR(500),
@Option5 VARCHAR(500),
@Remarks VARCHAR(MAX),
@UserID NVARCHAR(128),
@QuestionExaminationsList as QuestionExaminationsList READONLY,
@QuestionSubjectsList as QuestionSubjectsList READONLY,
@QuestionStandardsList as QuestionStandardsList READONLY,
@QuestionCompetitiveExaminationsList as QuestionCompetitiveExaminationsList READONLY,
@QuestionCategoryList as QuestionCategoryList READONLY
)
AS
BEGIN

declare @ExamList as QuestionExaminationsList;
Insert into @ExamList Select * from @QuestionExaminationsList;

declare @SubjectList as QuestionSubjectsList;
Insert into @SubjectList Select * from @QuestionSubjectsList;

declare @StandardList as QuestionStandardsList;
Insert into @StandardList Select * from @QuestionStandardsList;

declare @CExamList as QuestionCompetitiveExaminationsList;
Insert into @CExamList Select * from @QuestionCompetitiveExaminationsList;

declare @CatList as QuestionCategoryList;
Insert into @CatList Select * from @QuestionCategoryList;

BEGIN TRANSACTION;
BEGIN TRY

UPDATE Questions SET Question=@Question, Option1=@Option1, Option2=@Option2, Option3=@Option3, Option4=@Option4, Option5=@Option5, Remarks=@Remarks WHERE QuestionID=@original_QuestionID

DELETE FROM QuestionExaminations WHERE QuestionID=@original_QuestionID;
UPDATE @ExamList SET QuestionID=@original_QuestionID;
Insert Into QuestionExaminations(QuestionID,ExaminationID) Select QuestionID,ExaminationID from @ExamList;

DELETE FROM QuestionSubjects WHERE QuestionID=@original_QuestionID;
UPDATE @SubjectList SET QuestionID=@original_QuestionID;
Insert Into QuestionSubjects(QuestionID,SubjectID) Select QuestionID,SubjectID from @SubjectList;

DELETE FROM QuestionStandards WHERE QuestionID=@original_QuestionID;
UPDATE @StandardList SET QuestionID=@original_QuestionID;
Insert Into QuestionStandards(QuestionID,StandardID) Select QuestionID,StandardID from @StandardList;

DELETE FROM QuestionCompetitiveExaminations WHERE QuestionID=@original_QuestionID;
UPDATE @CExamList SET QuestionID=@original_QuestionID;
Insert Into QuestionCompetitiveExaminations(QuestionID,CompetitiveExaminationID) Select QuestionID,CompetitiveExaminationID from @CExamList;

DELETE FROM QuestionQuestionCategories WHERE QuestionID=@original_QuestionID;
UPDATE @CatList SET QuestionID=@original_QuestionID;
Insert Into QuestionQuestionCategories(QuestionID,QuestionCategoryID) Select QuestionID,QuestionCategoryID from @CatList;

UPDATE QuestionsByUsers set UserID=@UserID,EditedDateTime=getDate() WHERE QuestionID=@original_QuestionID;
END TRY

BEGIN CATCH
	IF @@TRANCOUNT>0
		ROLLBACK TRANSACTION;
END CATCH

IF @@TRANCOUNT>0
	COMMIT TRANSACTION;
END


GO
/****** Object:  StoredProcedure [dbo].[SP_QuestionStandards_SELECT_By_QuestionID_ALL]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SP_QuestionStandards_SELECT_By_QuestionID_ALL] (
@QuestionID INT
)
AS
BEGIN
select Cast(1 as BIT) as 'IsSelected' , StandardID from QuestionStandards where QuestionID=@QuestionID
UNION
SELECT cast(0 as BIT) as 'IsSelected', StandardID FROM Standards where StandardID NOT IN (Select StandardID from QuestionStandards where QuestionID=@QuestionID)
END


GO
/****** Object:  StoredProcedure [dbo].[SP_QuestionSubjects_SELECT_By_QuestionID_ALL]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SP_QuestionSubjects_SELECT_By_QuestionID_ALL] (
@QuestionID INT
)
AS
BEGIN
select Cast(1 as BIT) as 'IsSelected' , SubjectID from QuestionSubjects where QuestionID=@QuestionID
UNION
SELECT cast(0 as BIT) as 'IsSelected', SubjectID FROM Subjects where SubjectID NOT IN (Select SubjectID from QuestionSubjects where QuestionID=@QuestionID)
END

GO
/****** Object:  StoredProcedure [dbo].[SP_Standards_DELETE]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_Standards_DELETE] (
@original_StandardID VARCHAR(100),
@original_Description VARCHAR(500)
)
AS
BEGIN
DELETE FROM Standards
 WHERE
StandardID=@original_StandardID AND
((Description=@original_Description) OR (Description IS NULL AND @original_Description IS NULL))
END
GO
/****** Object:  StoredProcedure [dbo].[SP_Standards_INSERT]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SP_Standards_INSERT] (
@StandardID VARCHAR(100),
@Description VARCHAR(500)
)
AS
BEGIN
INSERT INTO Standards(StandardID, Description) VALUES(@StandardID, @Description)
END
GO
/****** Object:  StoredProcedure [dbo].[SP_Standards_SELECT]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_Standards_SELECT]
AS
BEGIN
SELECT StandardID, Description FROM Standards
END


GO
/****** Object:  StoredProcedure [dbo].[SP_Standards_SELECT_By_StandardID]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_Standards_SELECT_By_StandardID] (
@StandardID VARCHAR(100)
)
AS
BEGIN
SELECT StandardID, Description FROM Standards where StandardID=@StandardID
END
GO
/****** Object:  StoredProcedure [dbo].[SP_Standards_UPDATE]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_Standards_UPDATE] (
@StandardID VARCHAR(100),
@Description VARCHAR(500),
@original_StandardID VARCHAR(100),
@original_Description VARCHAR(500)
)
AS
BEGIN
UPDATE Standards SET StandardID=@StandardID, Description=@Description
 WHERE
StandardID=@original_StandardID AND
((Description=@original_Description) OR (Description IS NULL AND @original_Description IS NULL))
END
GO
/****** Object:  StoredProcedure [dbo].[SP_Subjects_DELETE]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SP_Subjects_DELETE] (
@original_SubjectID VARCHAR(100),
@original_Description VARCHAR(500)
)
AS
BEGIN
DELETE FROM Subjects
 WHERE
SubjectID=@original_SubjectID AND
((Description=@original_Description) OR (Description IS NULL AND @original_Description IS NULL))
END


GO
/****** Object:  StoredProcedure [dbo].[SP_Subjects_INSERT]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_Subjects_INSERT] (
@SubjectID VARCHAR(100),
@Description VARCHAR(500)
)
AS
BEGIN
INSERT INTO Subjects(SubjectID, Description) VALUES(@SubjectID, @Description)
END


GO
/****** Object:  StoredProcedure [dbo].[SP_Subjects_SELECT]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SP_Subjects_SELECT]
AS
BEGIN
SELECT SubjectID, Description FROM Subjects
END



GO
/****** Object:  StoredProcedure [dbo].[SP_Subjects_SELECT_by_SubjectID]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SP_Subjects_SELECT_by_SubjectID] (
@SubjectID VARCHAR(100)
)
AS
BEGIN
SELECT SubjectID, Description FROM Subjects WHERE SubjectID=@SubjectID
END
GO
/****** Object:  StoredProcedure [dbo].[SP_Subjects_UPDATE]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SP_Subjects_UPDATE] (
@SubjectID VARCHAR(100),
@Description VARCHAR(500),
@original_SubjectID VARCHAR(100),
@original_Description VARCHAR(500)
)
AS
BEGIN
UPDATE Subjects SET SubjectID=@SubjectID, Description=@Description
 WHERE
SubjectID=@original_SubjectID AND
((Description=@original_Description) OR (Description IS NULL AND @original_Description IS NULL))
END


GO
/****** Object:  Table [dbo].[AnswersByUsers]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[AnswersByUsers](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[UserID] [NVARCHAR](128) NOT NULL,
	[QuestionID] [int] NOT NULL,
	[CreatedDateTime] [datetime] NULL,
	[EditeddateTime] [datetime] NULL,
	[CorrectAnswer] [varchar](100) NULL,
	[Answer] [varchar](max) NULL,
 CONSTRAINT [AnswersByUsers_PK_ID] PRIMARY KEY CLUSTERED
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [AnswersByUsers_UQ] UNIQUE NONCLUSTERED
(
	[UserID] ASC,
	[QuestionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[AnswersByUsersApprovedByUsers]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AnswersByUsersApprovedByUsers](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[UserID] [NVARCHAR](128) NOT NULL,
	[AnswersByUsersID] [int] NOT NULL,
	[CreatedDateTime] [datetime] NULL,
	[EditeddateTime] [datetime] NULL,
	[IsApproved] [bit] NULL,
 CONSTRAINT [AnswersByUsersApprovedByUsers_PK_ID] PRIMARY KEY CLUSTERED
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [AnswersByUsersApprovedByUsers_UQ] UNIQUE NONCLUSTERED
(
	[UserID] ASC,
	[AnswersByUsersID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[CompetitiveExaminations]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[CompetitiveExaminations](
	[CompetitiveExaminationID] [varchar](100) NOT NULL,
	[Description] [varchar](500) NULL,
 CONSTRAINT [CompetitiveExaminations_PK_CompetitiveExaminationID] PRIMARY KEY CLUSTERED
(
	[CompetitiveExaminationID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Examinations]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Examinations](
	[ExaminationID] [varchar](100) NOT NULL,
	[Description] [varchar](500) NULL,
 CONSTRAINT [Examinations_PK_ExaminationID] PRIMARY KEY CLUSTERED
(
	[ExaminationID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[News]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[News](
	[NewsID] [int] IDENTITY(1,1) NOT NULL,
	[Title] [varchar](500) NOT NULL,
	[Description] [varchar](max) NULL,
	[Broadcast] [bit] NULL,
	[CreatedDateTime] [datetime] NULL,
	[EditedDateTime] [datetime] NULL,
 CONSTRAINT [News_PK_NewsID] PRIMARY KEY CLUSTERED
(
	[NewsID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[PaperCategories]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[PaperCategories](
	[PaperCategoryID] [varchar](100) NOT NULL,
	[Description] [varchar](500) NULL,
 CONSTRAINT [PaperCategories_PK_PaperCategoryID] PRIMARY KEY CLUSTERED
(
	[PaperCategoryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[PaperExaminations]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[PaperExaminations](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[PaperID] [int] NOT NULL,
	[ExaminationID] [varchar](100) NOT NULL,
 CONSTRAINT [PaperExaminations_PK_ID] PRIMARY KEY CLUSTERED
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [PaperExaminations_UQ] UNIQUE NONCLUSTERED
(
	[PaperID] ASC,
	[ExaminationID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Papers]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Papers](
	[PaperID] [int] IDENTITY(54321,1) NOT NULL,
	[PaperName] [varchar](500) NOT NULL,
	[MaximumMarks] [int] NULL,
	[MinimumMarks] [int] NULL,
	[Duration] [int] NULL,
	[Description] [varchar](max) NULL,
 CONSTRAINT [Papers_PK_PaperID] PRIMARY KEY CLUSTERED
(
	[PaperID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[PapersApprovedByusers]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PapersApprovedByusers](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[PaperID] [int] NOT NULL,
	[UserID] [NVARCHAR](128) NOT NULL,
	[CreatedDateTime] [datetime] NULL,
	[EditedDateTime] [datetime] NULL,
	[IsApproved] [bit] NOT NULL,
 CONSTRAINT [PapersApprovedByusers_PK_ID] PRIMARY KEY CLUSTERED
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [PapersApprovedByusers_UQ_PaperID] UNIQUE NONCLUSTERED
(
	[PaperID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[PapersByUsers]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PapersByUsers](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[UserID] [NVARCHAR](128) NOT NULL,
	[PaperID] [int] NOT NULL,
	[CreatedDateTime] [datetime] NULL,
	[EditedDateTime] [datetime] NULL,
 CONSTRAINT [PapersByUsers_PK_ID] PRIMARY KEY CLUSTERED
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [PapersByUsers_UQ] UNIQUE NONCLUSTERED
(
	[UserID] ASC,
	[PaperID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[PapersPaperCategories]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[PapersPaperCategories](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[PaperID] [int] NOT NULL,
	[PaperCategoryID] [varchar](100) NOT NULL,
 CONSTRAINT [PapersPaperCategories_PK_ID] PRIMARY KEY CLUSTERED
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [PapersPaperCategories_UQ] UNIQUE NONCLUSTERED
(
	[PaperID] ASC,
	[PaperCategoryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[PaperStandards]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[PaperStandards](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[PaperID] [int] NOT NULL,
	[StandardID] [varchar](100) NOT NULL,
 CONSTRAINT [PaperStandards_PK_ID] PRIMARY KEY CLUSTERED
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [PaperStandards_UQ] UNIQUE NONCLUSTERED
(
	[PaperID] ASC,
	[StandardID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[PaperSubjects]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[PaperSubjects](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[PaperID] [int] NOT NULL,
	[SubjectID] [varchar](100) NOT NULL,
 CONSTRAINT [PaperSubjects_PK_ID] PRIMARY KEY CLUSTERED
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [PaperSubjects_UQ] UNIQUE NONCLUSTERED
(
	[PaperID] ASC,
	[SubjectID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[PaperYears]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PaperYears](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[PaperID] [int] NOT NULL,
	[YearID] [int] NOT NULL,
 CONSTRAINT [PaperYears_PK_ID] PRIMARY KEY CLUSTERED
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [PaperYears_UQ] UNIQUE NONCLUSTERED
(
	[PaperID] ASC,
	[YearID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[QuestionCategories]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[QuestionCategories](
	[QuestionCategoryID] [varchar](100) NOT NULL,
	[Description] [varchar](500) NULL,
 CONSTRAINT [QuestionCategories_PK_QuestionCategoryID] PRIMARY KEY CLUSTERED
(
	[QuestionCategoryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[QuestionCompetitiveExaminations]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[QuestionCompetitiveExaminations](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[QuestionID] [int] NOT NULL,
	[CompetitiveExaminationID] [varchar](100) NOT NULL,
	[YearID] [int] NOT NULL,
 CONSTRAINT [QuestionCompetitiveExaminations_PK_ID] PRIMARY KEY CLUSTERED
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [QuestionCompetitiveExaminations_UQ] UNIQUE NONCLUSTERED
(
	[QuestionID] ASC,
	[CompetitiveExaminationID] ASC,
	[YearID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[QuestionExaminations]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[QuestionExaminations](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[QuestionID] [int] NOT NULL,
	[ExaminationID] [varchar](100) NOT NULL,
 CONSTRAINT [QuestionExaminations_PK_ID] PRIMARY KEY CLUSTERED
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [QuestionExaminations_UQ] UNIQUE NONCLUSTERED
(
	[QuestionID] ASC,
	[ExaminationID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[QuestionQuestionCategories]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[QuestionQuestionCategories](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[QuestionID] [int] NOT NULL,
	[QuestionCategoryID] [varchar](100) NOT NULL,
 CONSTRAINT [QuestionQuestionCategories_PK_ID] PRIMARY KEY CLUSTERED
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [QuestionQuestionCategories_UQ] UNIQUE NONCLUSTERED
(
	[QuestionID] ASC,
	[QuestionCategoryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Questions]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Questions](
	[QuestionID] [int] IDENTITY(1,1) NOT NULL,
	[Question] [varchar](900) NOT NULL,
	[Option1] [varchar](500) NULL,
	[Option2] [varchar](500) NULL,
	[Option3] [varchar](500) NULL,
	[Option4] [varchar](500) NULL,
	[Option5] [varchar](500) NULL,
	[Remarks] [varchar](max) NULL,
 CONSTRAINT [Questions_PK_QuestionID] PRIMARY KEY CLUSTERED
(
	[QuestionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [Questions_UQ_Question] UNIQUE NONCLUSTERED
(
	[Question] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[QuestionsApprovedByUsers]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[QuestionsApprovedByUsers](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[QuestionID] [int] NOT NULL,
	[UserID] [NVARCHAR](128) NULL,
	[CreatedDateTime] [datetime] NULL,
	[EditeddateTime] [datetime] NULL,
	[IsApproved] [bit] NULL,
 CONSTRAINT [QuestionsApprovedByUsers_PK_ID] PRIMARY KEY CLUSTERED
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [QuestionsApprovedByUsers_UQ_QuestionID] UNIQUE NONCLUSTERED
(
	[QuestionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[QuestionsByUsers]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[QuestionsByUsers](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[UserID] [NVARCHAR](128) NOT NULL,
	[QuestionID] [int] NOT NULL,
	[CreatedDateTime] [datetime] NULL,
	[EditeddateTime] [datetime] NULL,
 CONSTRAINT [QuestionsByUsers_PK_ID] PRIMARY KEY CLUSTERED
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [QuestionsByUsers_UQ] UNIQUE NONCLUSTERED
(
	[UserID] ASC,
	[QuestionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[QuestionStandards]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[QuestionStandards](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[QuestionID] [int] NOT NULL,
	[StandardID] [varchar](100) NOT NULL,
 CONSTRAINT [QuestionStandards_PK_ID] PRIMARY KEY CLUSTERED
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [QuestionStandards_UQ] UNIQUE NONCLUSTERED
(
	[QuestionID] ASC,
	[StandardID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[QuestionSubjects]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[QuestionSubjects](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[QuestionID] [int] NOT NULL,
	[SubjectID] [varchar](100) NOT NULL,
 CONSTRAINT [QuestionSubjects_PK_ID] PRIMARY KEY CLUSTERED
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [QuestionSubjects_UQ] UNIQUE NONCLUSTERED
(
	[QuestionID] ASC,
	[SubjectID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[SectionQuestions]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SectionQuestions](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[SectionID] [int] NOT NULL,
	[QuestionID] [int] NOT NULL,
	[QuestionNo] [int] NOT NULL,
	[MaximumMarks] [int] NULL,
 CONSTRAINT [SectionQuestions_PK_ID] PRIMARY KEY CLUSTERED
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [SectionQuestions_UQ] UNIQUE NONCLUSTERED
(
	[SectionID] ASC,
	[QuestionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sections]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Sections](
	[SectionID] [int] IDENTITY(1,1) NOT NULL,
	[PaperID] [int] NOT NULL,
	[SectionName] [varchar](500) NOT NULL,
	[Description] [varchar](max) NULL,
	[SectionNo] [int] NOT NULL,
 CONSTRAINT [Sections_PK_SectionID] PRIMARY KEY CLUSTERED
(
	[SectionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [Sections_UQ] UNIQUE NONCLUSTERED
(
	[PaperID] ASC,
	[SectionNo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Standards]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Standards](
	[StandardID] [varchar](100) NOT NULL,
	[Description] [varchar](500) NULL,
 CONSTRAINT [Standards_PK_StandardID] PRIMARY KEY CLUSTERED
(
	[StandardID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Subjects]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Subjects](
	[SubjectID] [varchar](100) NOT NULL,
	[Description] [varchar](500) NULL,
 CONSTRAINT [Subjects_PK_SubjectID] PRIMARY KEY CLUSTERED
(
	[SubjectID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Threads]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Threads](
	[ThreadID] [int] IDENTITY(1,1) NOT NULL,
	[QuestionID] [int] NOT NULL,
	[Description] [varchar](900) NOT NULL,
 CONSTRAINT [Threads_PK_ThreadID] PRIMARY KEY CLUSTERED
(
	[ThreadID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [Threads_UQ] UNIQUE NONCLUSTERED
(
	[QuestionID] ASC,
	[Description] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[ThreadsByUsers]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ThreadsByUsers](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[ThreadID] [int] NOT NULL,
	[UserID] [NVARCHAR](128) NOT NULL,
 CONSTRAINT [ThreadsByUsers_PK_ID] PRIMARY KEY CLUSTERED
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [ThreadsByUsers_UQ] UNIQUE NONCLUSTERED
(
	[ThreadID] ASC,
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Years]    Script Date: 8/15/2016 9:16:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Years](
	[YearID] [int] NOT NULL,
 CONSTRAINT [Years_PK_YearID] PRIMARY KEY CLUSTERED
(
	[YearID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
ALTER TABLE [dbo].[AnswersByUsersApprovedByUsers] ADD  DEFAULT ((0)) FOR [IsApproved]
GO
ALTER TABLE [dbo].[News] ADD  DEFAULT ((0)) FOR [Broadcast]
GO
ALTER TABLE [dbo].[PapersApprovedByusers] ADD  DEFAULT ((0)) FOR [IsApproved]
GO
ALTER TABLE [dbo].[QuestionsApprovedByUsers] ADD  DEFAULT ((0)) FOR [IsApproved]
GO
ALTER TABLE [dbo].[AnswersByUsers]  WITH CHECK ADD  CONSTRAINT [AnswersByUsers_REF_QuestionID] FOREIGN KEY([QuestionID])
REFERENCES [dbo].[Questions] ([QuestionID])
GO
ALTER TABLE [dbo].[AnswersByUsers] CHECK CONSTRAINT [AnswersByUsers_REF_QuestionID]
GO
ALTER TABLE [dbo].[AnswersByUsers]  WITH CHECK ADD  CONSTRAINT [AnswersByUsers_REF_UserID] FOREIGN KEY([UserID])
REFERENCES [dbo].[AspNetUsers] ([Id])
GO
ALTER TABLE [dbo].[AnswersByUsers] CHECK CONSTRAINT [AnswersByUsers_REF_UserID]
GO
ALTER TABLE [dbo].[AnswersByUsersApprovedByUsers]  WITH CHECK ADD  CONSTRAINT [AnswersByUsersApprovedByUsers_REF_AnswersByUsersID] FOREIGN KEY([AnswersByUsersID])
REFERENCES [dbo].[AnswersByUsers] ([ID])
GO
ALTER TABLE [dbo].[AnswersByUsersApprovedByUsers] CHECK CONSTRAINT [AnswersByUsersApprovedByUsers_REF_AnswersByUsersID]
GO
ALTER TABLE [dbo].[AnswersByUsersApprovedByUsers]  WITH CHECK ADD  CONSTRAINT [AnswersByUsersApprovedByUsers_REF_UserID] FOREIGN KEY([UserID])
REFERENCES [dbo].[AspNetUsers] ([Id])
GO
ALTER TABLE [dbo].[AnswersByUsersApprovedByUsers] CHECK CONSTRAINT [AnswersByUsersApprovedByUsers_REF_UserID]
GO
ALTER TABLE [dbo].[PaperExaminations]  WITH CHECK ADD  CONSTRAINT [PaperExaminations_REF_ExaminationID] FOREIGN KEY([ExaminationID])
REFERENCES [dbo].[Examinations] ([ExaminationID])
GO
ALTER TABLE [dbo].[PaperExaminations] CHECK CONSTRAINT [PaperExaminations_REF_ExaminationID]
GO
ALTER TABLE [dbo].[PaperExaminations]  WITH CHECK ADD  CONSTRAINT [PaperExaminations_REF_PaperID] FOREIGN KEY([PaperID])
REFERENCES [dbo].[Papers] ([PaperID])
GO
ALTER TABLE [dbo].[PaperExaminations] CHECK CONSTRAINT [PaperExaminations_REF_PaperID]
GO
ALTER TABLE [dbo].[PapersApprovedByusers]  WITH CHECK ADD  CONSTRAINT [PapersApprovedByusers_REF_PaperID] FOREIGN KEY([PaperID])
REFERENCES [dbo].[Papers] ([PaperID])
GO
ALTER TABLE [dbo].[PapersApprovedByusers] CHECK CONSTRAINT [PapersApprovedByusers_REF_PaperID]
GO
ALTER TABLE [dbo].[PapersApprovedByusers]  WITH CHECK ADD  CONSTRAINT [PapersApprovedByusers_REF_UserID] FOREIGN KEY([UserID])
REFERENCES [dbo].[AspNetUsers] ([Id])
GO
ALTER TABLE [dbo].[PapersApprovedByusers] CHECK CONSTRAINT [PapersApprovedByusers_REF_UserID]
GO
ALTER TABLE [dbo].[PapersByUsers]  WITH CHECK ADD  CONSTRAINT [PapersByUsers_REF_PaperID] FOREIGN KEY([PaperID])
REFERENCES [dbo].[Papers] ([PaperID])
GO
ALTER TABLE [dbo].[PapersByUsers] CHECK CONSTRAINT [PapersByUsers_REF_PaperID]
GO
ALTER TABLE [dbo].[PapersByUsers]  WITH CHECK ADD  CONSTRAINT [PapersByUsers_REF_UserID] FOREIGN KEY([UserID])
REFERENCES [dbo].[AspNetUsers] ([Id])
GO
ALTER TABLE [dbo].[PapersByUsers] CHECK CONSTRAINT [PapersByUsers_REF_UserID]
GO
ALTER TABLE [dbo].[PapersPaperCategories]  WITH CHECK ADD  CONSTRAINT [PapersPaperCategories_REF_PaperCategoryID] FOREIGN KEY([PaperCategoryID])
REFERENCES [dbo].[PaperCategories] ([PaperCategoryID])
GO
ALTER TABLE [dbo].[PapersPaperCategories] CHECK CONSTRAINT [PapersPaperCategories_REF_PaperCategoryID]
GO
ALTER TABLE [dbo].[PapersPaperCategories]  WITH CHECK ADD  CONSTRAINT [PapersPaperCategories_REF_PaperID] FOREIGN KEY([PaperID])
REFERENCES [dbo].[Papers] ([PaperID])
GO
ALTER TABLE [dbo].[PapersPaperCategories] CHECK CONSTRAINT [PapersPaperCategories_REF_PaperID]
GO
ALTER TABLE [dbo].[PaperStandards]  WITH CHECK ADD  CONSTRAINT [PaperStandards_REF_PaperID] FOREIGN KEY([PaperID])
REFERENCES [dbo].[Papers] ([PaperID])
GO
ALTER TABLE [dbo].[PaperStandards] CHECK CONSTRAINT [PaperStandards_REF_PaperID]
GO
ALTER TABLE [dbo].[PaperStandards]  WITH CHECK ADD  CONSTRAINT [PaperStandards_REF_StandardID] FOREIGN KEY([StandardID])
REFERENCES [dbo].[Standards] ([StandardID])
GO
ALTER TABLE [dbo].[PaperStandards] CHECK CONSTRAINT [PaperStandards_REF_StandardID]
GO
ALTER TABLE [dbo].[PaperSubjects]  WITH CHECK ADD  CONSTRAINT [PaperSubjects_REF_PaperID] FOREIGN KEY([PaperID])
REFERENCES [dbo].[Papers] ([PaperID])
GO
ALTER TABLE [dbo].[PaperSubjects] CHECK CONSTRAINT [PaperSubjects_REF_PaperID]
GO
ALTER TABLE [dbo].[PaperSubjects]  WITH CHECK ADD  CONSTRAINT [PaperSubjects_REF_SubjectID] FOREIGN KEY([SubjectID])
REFERENCES [dbo].[Subjects] ([SubjectID])
GO
ALTER TABLE [dbo].[PaperSubjects] CHECK CONSTRAINT [PaperSubjects_REF_SubjectID]
GO
ALTER TABLE [dbo].[PaperYears]  WITH CHECK ADD  CONSTRAINT [PaperYears_REF_PaperID] FOREIGN KEY([PaperID])
REFERENCES [dbo].[Papers] ([PaperID])
GO
ALTER TABLE [dbo].[PaperYears] CHECK CONSTRAINT [PaperYears_REF_PaperID]
GO
ALTER TABLE [dbo].[PaperYears]  WITH CHECK ADD  CONSTRAINT [PaperYears_REF_YearID] FOREIGN KEY([YearID])
REFERENCES [dbo].[Years] ([YearID])
GO
ALTER TABLE [dbo].[PaperYears] CHECK CONSTRAINT [PaperYears_REF_YearID]
GO
ALTER TABLE [dbo].[QuestionCompetitiveExaminations]  WITH CHECK ADD  CONSTRAINT [QuestionCompetitiveExaminations_REF_CompetitiveExaminationID] FOREIGN KEY([CompetitiveExaminationID])
REFERENCES [dbo].[CompetitiveExaminations] ([CompetitiveExaminationID])
GO
ALTER TABLE [dbo].[QuestionCompetitiveExaminations] CHECK CONSTRAINT [QuestionCompetitiveExaminations_REF_CompetitiveExaminationID]
GO
ALTER TABLE [dbo].[QuestionCompetitiveExaminations]  WITH CHECK ADD  CONSTRAINT [QuestionCompetitiveExaminations_REF_QuestionID] FOREIGN KEY([QuestionID])
REFERENCES [dbo].[Questions] ([QuestionID])
GO
ALTER TABLE [dbo].[QuestionCompetitiveExaminations] CHECK CONSTRAINT [QuestionCompetitiveExaminations_REF_QuestionID]
GO
ALTER TABLE [dbo].[QuestionCompetitiveExaminations]  WITH CHECK ADD  CONSTRAINT [QuestionCompetitiveExaminations_REF_YearID] FOREIGN KEY([YearID])
REFERENCES [dbo].[Years] ([YearID])
GO
ALTER TABLE [dbo].[QuestionCompetitiveExaminations] CHECK CONSTRAINT [QuestionCompetitiveExaminations_REF_YearID]
GO
ALTER TABLE [dbo].[QuestionExaminations]  WITH CHECK ADD  CONSTRAINT [QuestionExaminations_REF_ExaminationID] FOREIGN KEY([ExaminationID])
REFERENCES [dbo].[Examinations] ([ExaminationID])
GO
ALTER TABLE [dbo].[QuestionExaminations] CHECK CONSTRAINT [QuestionExaminations_REF_ExaminationID]
GO
ALTER TABLE [dbo].[QuestionExaminations]  WITH CHECK ADD  CONSTRAINT [QuestionExaminations_REF_QuestionID] FOREIGN KEY([QuestionID])
REFERENCES [dbo].[Questions] ([QuestionID])
GO
ALTER TABLE [dbo].[QuestionExaminations] CHECK CONSTRAINT [QuestionExaminations_REF_QuestionID]
GO
ALTER TABLE [dbo].[QuestionQuestionCategories]  WITH CHECK ADD  CONSTRAINT [QuestionQuestionCategories_REF_QuestionCategoryID] FOREIGN KEY([QuestionCategoryID])
REFERENCES [dbo].[QuestionCategories] ([QuestionCategoryID])
GO
ALTER TABLE [dbo].[QuestionQuestionCategories] CHECK CONSTRAINT [QuestionQuestionCategories_REF_QuestionCategoryID]
GO
ALTER TABLE [dbo].[QuestionQuestionCategories]  WITH CHECK ADD  CONSTRAINT [QuestionQuestionCategories_REF_QuestionID] FOREIGN KEY([QuestionID])
REFERENCES [dbo].[Questions] ([QuestionID])
GO
ALTER TABLE [dbo].[QuestionQuestionCategories] CHECK CONSTRAINT [QuestionQuestionCategories_REF_QuestionID]
GO
ALTER TABLE [dbo].[QuestionsApprovedByUsers]  WITH CHECK ADD  CONSTRAINT [QuestionsApprovedByUsers_REF_QuestionID] FOREIGN KEY([QuestionID])
REFERENCES [dbo].[Questions] ([QuestionID])
GO
ALTER TABLE [dbo].[QuestionsApprovedByUsers] CHECK CONSTRAINT [QuestionsApprovedByUsers_REF_QuestionID]
GO
ALTER TABLE [dbo].[QuestionsApprovedByUsers]  WITH CHECK ADD  CONSTRAINT [QuestionsApprovedByUsers_REF_UserID] FOREIGN KEY([UserID])
REFERENCES [dbo].[AspNetUsers] ([Id])
GO
ALTER TABLE [dbo].[QuestionsApprovedByUsers] CHECK CONSTRAINT [QuestionsApprovedByUsers_REF_UserID]
GO
ALTER TABLE [dbo].[QuestionsByUsers]  WITH CHECK ADD  CONSTRAINT [QuestionsByUsers_REF_QuestionID] FOREIGN KEY([QuestionID])
REFERENCES [dbo].[Questions] ([QuestionID])
GO
ALTER TABLE [dbo].[QuestionsByUsers] CHECK CONSTRAINT [QuestionsByUsers_REF_QuestionID]
GO
ALTER TABLE [dbo].[QuestionsByUsers]  WITH CHECK ADD  CONSTRAINT [QuestionsByUsers_REF_UserID] FOREIGN KEY([UserID])
REFERENCES [dbo].[AspNetUsers] ([Id])
GO
ALTER TABLE [dbo].[QuestionsByUsers] CHECK CONSTRAINT [QuestionsByUsers_REF_UserID]
GO
ALTER TABLE [dbo].[QuestionStandards]  WITH CHECK ADD  CONSTRAINT [QuestionStandards_REF_QuestionID] FOREIGN KEY([QuestionID])
REFERENCES [dbo].[Questions] ([QuestionID])
GO
ALTER TABLE [dbo].[QuestionStandards] CHECK CONSTRAINT [QuestionStandards_REF_QuestionID]
GO
ALTER TABLE [dbo].[QuestionStandards]  WITH CHECK ADD  CONSTRAINT [QuestionStandards_REF_StandardID] FOREIGN KEY([StandardID])
REFERENCES [dbo].[Standards] ([StandardID])
GO
ALTER TABLE [dbo].[QuestionStandards] CHECK CONSTRAINT [QuestionStandards_REF_StandardID]
GO
ALTER TABLE [dbo].[QuestionSubjects]  WITH CHECK ADD  CONSTRAINT [QuestionSubjects_REF_QuestionID] FOREIGN KEY([QuestionID])
REFERENCES [dbo].[Questions] ([QuestionID])
GO
ALTER TABLE [dbo].[QuestionSubjects] CHECK CONSTRAINT [QuestionSubjects_REF_QuestionID]
GO
ALTER TABLE [dbo].[QuestionSubjects]  WITH CHECK ADD  CONSTRAINT [QuestionSubjects_REF_SubjectID] FOREIGN KEY([SubjectID])
REFERENCES [dbo].[Subjects] ([SubjectID])
GO
ALTER TABLE [dbo].[QuestionSubjects] CHECK CONSTRAINT [QuestionSubjects_REF_SubjectID]
GO
ALTER TABLE [dbo].[SectionQuestions]  WITH CHECK ADD  CONSTRAINT [SectionQuestions_REF_QuestionID] FOREIGN KEY([QuestionID])
REFERENCES [dbo].[Questions] ([QuestionID])
GO
ALTER TABLE [dbo].[SectionQuestions] CHECK CONSTRAINT [SectionQuestions_REF_QuestionID]
GO
ALTER TABLE [dbo].[SectionQuestions]  WITH CHECK ADD  CONSTRAINT [SectionQuestions_REF_SectionID] FOREIGN KEY([SectionID])
REFERENCES [dbo].[Sections] ([SectionID])
GO
ALTER TABLE [dbo].[SectionQuestions] CHECK CONSTRAINT [SectionQuestions_REF_SectionID]
GO
ALTER TABLE [dbo].[Sections]  WITH CHECK ADD  CONSTRAINT [Sections_REF_PaperID] FOREIGN KEY([PaperID])
REFERENCES [dbo].[Papers] ([PaperID])
GO
ALTER TABLE [dbo].[Sections] CHECK CONSTRAINT [Sections_REF_PaperID]
GO
ALTER TABLE [dbo].[Threads]  WITH CHECK ADD  CONSTRAINT [Threads_REF_QuestionID] FOREIGN KEY([QuestionID])
REFERENCES [dbo].[Questions] ([QuestionID])
GO
ALTER TABLE [dbo].[Threads] CHECK CONSTRAINT [Threads_REF_QuestionID]
GO
ALTER TABLE [dbo].[ThreadsByUsers]  WITH CHECK ADD  CONSTRAINT [ThreadsByUsers_REF_ThreadID] FOREIGN KEY([ThreadID])
REFERENCES [dbo].[Threads] ([ThreadID])
GO
ALTER TABLE [dbo].[ThreadsByUsers] CHECK CONSTRAINT [ThreadsByUsers_REF_ThreadID]
GO
ALTER TABLE [dbo].[ThreadsByUsers]  WITH CHECK ADD  CONSTRAINT [ThreadsByUsers_REF_UserID] FOREIGN KEY([UserID])
REFERENCES [dbo].[AspNetUsers] ([Id])
GO
ALTER TABLE [dbo].[ThreadsByUsers] CHECK CONSTRAINT [ThreadsByUsers_REF_UserID]
GO
