using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;

namespace TrainingData
{
    public class TrainingInfo
    {
        public int SaveTrainingRecord(Training trainingData)
        {
            int trainingId = int.MinValue;

            try
            {
                //Create database context to access tables and perform operations on it
                using (var context = new TrainingInfoEntities())
                {
                    //Adding Training record in context
                    context.Trainings.Add(trainingData);

                    //Pushing context changes to database
                    context.SaveChanges();

                    //Perform necessary information log

                    //Retrieve training id generated for the above inserted record. Name and Start date is a unique combination
                    var training = context.Trainings.FirstOrDefault(o => o.Name == trainingData.Name && o.Start_Date == trainingData.Start_Date);
                    if (training != null)
                    {
                        trainingId = training.Id;
                    }
                }
            }
            catch(Exception ex)
            {
                //customize if required and also do proper log
                throw ex;
            }

            return trainingId;
        }
    }
}
