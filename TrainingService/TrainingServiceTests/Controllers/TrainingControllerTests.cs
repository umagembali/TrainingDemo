using Microsoft.VisualStudio.TestTools.UnitTesting;
using TrainingService.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TrainingService.Controllers.Tests
{
    [TestClass()]
    public class TrainingControllerTests
    {
        [TestMethod()]
        public void SaveTrainingTestHappyPath()
        {
            //Hard coded inputs and also expected message content. Please do change it manually if it is of handful tests. 
            //In case of automation, write code to read the current training id and also duration of training days from dates.

            string trainingName = "VB";
            DateTime startDate = new DateTime(2019, 01, 01);
            DateTime endDate = new DateTime(2019, 02, 01);

            var result = new TrainingController().SaveTraining(trainingName, startDate, endDate);
            Assert.IsNotNull(result, "Unexpected return code");
            Assert.IsTrue(((System.Web.Http.Results.OkNegotiatedContentResult<string>)result).Content.ToString().ToLower() == "training has been confirmed for a duration of 32 days. training id is 1");
            //Assert.IsTrue(((System.Web.Http.Results.OkNegotiatedContentResult<System.Web.Http.Results.JsonResult<string>>)result).Content.Content.ToString().ToLower() == "training has been confirmed for a duration of 32 days. training id is 1");
        }

        [TestMethod()]
        public void SaveTrainingTestUniqueConstraint()
        {
            //Hard coded inputs and also expected message content. Please do change it manually if it is of handful tests. 
            //In case of automation, write code to read the current training id and also duration of training days from dates.

            string trainingName = "VB";
            DateTime startDate = new DateTime(2019, 01, 01);
            DateTime endDate = new DateTime(2019, 02, 01);

            var result = new TrainingController().SaveTraining(trainingName, startDate, endDate);
            Assert.IsNotNull(result, "Unexpected return code");
            Exception ex = ((System.Web.Http.Results.ExceptionResult)result).Exception;
            string exMessage = ex.Message + ";";
            while(ex.InnerException != null)
            {
                ex = ex.InnerException;
                exMessage = exMessage + ex.Message + ";";
            }

            Assert.IsTrue(exMessage.ToLower().Contains("violation of unique key constraint"));
        }
    }
}