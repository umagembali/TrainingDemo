using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using TrainingData;

namespace TrainingService.Controllers
{
    public class TrainingController : ApiController
    {
        [HttpPost]
        [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
        public HttpResponseMessage SaveTraining(string trainingName, DateTime startDate, DateTime endDate)
        {
            try
            {
                //Read Request

                //Call business logic
                var returnMessage = SavingTrainingRecord(trainingName, startDate, endDate);

                //Create Response 
                HttpResponseMessage responseMessage = Request.CreateResponse(HttpStatusCode.OK, returnMessage);
                responseMessage.Headers.Add("Access-Control-Allow-Origin", "*");
                return responseMessage;

            }
            catch (Exception ex)
            {
                string exMessage = string.Format("Error:{0},StackTrace:{1}\r\n", ex.Message, ex.StackTrace);
                while (ex.InnerException != null)
                {
                    ex = ex.InnerException;
                    exMessage = string.Format("Error:{0},StackTrace:{1}\r\n", ex.Message, ex.StackTrace);
                }
                HttpResponseMessage responseMessage = Request.CreateResponse(HttpStatusCode.InternalServerError, exMessage);
                responseMessage.Headers.Add("Access-Control-Allow-Origin", "*");
                return responseMessage;
            }
        }

        public string SavingTrainingRecord(string trainingName, DateTime startDate, DateTime endDate)
        {

                //Best practice is to create a Domain object and map input to it. Perform all business logic on it. 
                //Then map the Domain object to instance of class inherited from EF table. This way, you can better segregate the data with its layer responsibility

                //For now, Created EF table instance and mapped input values to it
                Training trainingData = new Training()
                {
                    Name = trainingName,
                    Start_Date = startDate,
                    End_Date = endDate
                };

                //Business logic comes here on Training data

                //Assume that training is confirmed by default
                trainingData.Confirmed = true;

                //Save the training record into database
                int trainingId = new TrainingInfo().SaveTrainingRecord(trainingData);

                //Got the unexpected return value. Some issue occured where exception is not generated and also expected logic didn't execute
                if (trainingId == int.MinValue)
                {
                    throw new Exception("Failed to insert training record..Data layer method logic didn't execute in an expected way");
                }

                string returnMessage = string.Format("Training has been confirmed for a duration of {0} days. Training Id is {1}", Convert.ToInt32((endDate - startDate).TotalDays + 1), trainingId);

                trainingData = null;
                return returnMessage;
        }
    }
}
