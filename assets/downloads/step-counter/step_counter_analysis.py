##########################################

# Basic Requirement 1 - Create a fully automated embedded system that utilises digital/analogue inputs and digital/analogue outputs to support the theme of wellbeing.
##########################################


#psudo code form the micorbit 


#For the input the Microbit-taking times and steps data from microbit and thonny-taking user inputs and using those for future
#For the output the Microbit-saving data to a csv file and displaying a graph

##########################################
#Basic Requirement 2:Validate and store the data gathered from the embedded system
##########################################
"""
import csv

def validate_csv(input_file, output_file):
    with open(input_file, 'r') as csv_input, open(output_file, 'w', newline='') as csv_output:
        reader = csv.reader(csv_input)
        writer = csv.writer(csv_output)
        for row in reader:
            new_row = []
            for item in row:
                try:
                    # convert the data to a float and round it to the nearest whole number
                    rounded_num = round(float(item))
                    # Check if time data is less than 86400
                    if 0 <= rounded_num < 86400:
                        new_row.append(rounded_num)
                    else:
                        # If time data exceeds 86400, set it to 0 or do something else as needed
                        new_row.append(0)  
                except ValueError:
                    new_row.append(item)
            writer.writerow(new_row)
            
input_file = 'sample step.csv'
output_file = 'validated.csv'
validate_csv(input_file, output_file)
"""
"""

##########################################
# Basic requirement 3:Create an analysis component that can be used to calculate or predict certain information and inform future decisions relating to wellbeing. 
# this code takes in data from the csv and allows the user to predict the amount of steps after a certain time
##########################################


import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import csv

df = pd.read_csv("sample step.csv")
print(df)
time = df['time']
steps = df['steps']

plt.plot(time, steps, "gs-")

z = np.polyfit(time, steps, 1)
f = np.poly1d(z)

slope = z[0]
y_intercept = z[1]

time_predict = float(input("Predict the steps after a time (time in seconds): "))
step_predict = slope * time_predict + y_intercept  

plt.plot(time, f(time), "r--")
plt.scatter(time_predict, step_predict, color='blue')  
plt.text(time_predict, step_predict, f'({time_predict},{step_predict:.2f})', fontsize=9, verticalalignment='bottom')

plt.xlabel('Time')
plt.ylabel('Steps')
plt.title('Steps vs Time with Prediction')
plt.show()

"""
##########################################
#getting min max and average of my list
##########################################
#is so the user can view the max and min of the data 
"""
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import csv

#taking in my csv 
file_path = "sample step.csv"

with open(file_path, "r") as file:
    dataIn = file.read()
dataIn = dataIn[:-1]
myList = [(value) for value in dataIn.split("\n")]

# Calculate min,max values and second highest value 
minValue = min(myList)
maxValue = max(myList)
SecondHighest = max(value for value in myList if value < maxValue) #change variables caps

# Print the results
print("The lowest measurements were:", minValue)
print("The second highest measurement was:",SecondHighest)
     
"""

##########################################
#Advanced requirement 1:
#Using Python and/or JavaScript, create a computer model based on your own personally 
#created dataset of wellbeing data or one that you have sourced externally (suggestions 
#included on the next page). Your personal dataset could be generated manually, 
#programmatically or by the embedded system. The dataset should contain multiple descriptive 
#features of wellbeing and the model should be capable of answering a minimum of two ‘what 
#if’ type questions which you will need to devise yourself.
##########################################


#creating more data based on my data set and collecting more info on the user
#this allows the user to input their happiness,sleep and amount of steps they did 

sleep = float(input("How many hours of sleep did you get: "))
steps = int(input("How many steps have you done today: "))
happy = int(input("On a scale of 1 to 10, how happy are you today: "))

# Check if hours of sleep are more than 24
if sleep > 24:
    print("Error: Invalid input for hours of sleep. Please enter a value less than or equal to 24.")
else:
    # Check if happiness level is within the valid range (1-10)
    if happy < 1 or happy > 10:
        print("Error: Invalid input for happiness level. Please enter a value between 1 and 10.")
    else:
        # Calculate sleep score
        sleep_score = 0
        if sleep < 5:
            sleep_score += 1
        elif sleep < 7:
            sleep_score += 3
        elif sleep > 8:
            sleep_score += 5

        # Calculate happiness score
        happy_score = 0
        if happy < 5:
            happy_score += 1
        elif happy < 7:
            happy_score += 3
        elif happy > 8:
            happy_score += 5

        # Calculate steps score
        steps_score = 0
        if steps < 5000:
            steps_score += 1
        elif steps < 7000:
            steps_score += 3
        elif steps > 8000:
            steps_score += 5

        # Display scores
        print(f"Sleep Score: {sleep_score}")
        print(f"Happiness Score: {happy_score}") # string format
        print(f"Steps Score: {steps_score}")

        # calculate and display a total score
        total_score = sleep_score + happy_score + steps_score
        print(f"Total Score: {total_score}")

        # Check if all three scores are 5 and print a "Well done" message
        if sleep_score == 5 and happy_score == 5 and steps_score == 5:
            print("Well done! You scored 5 in each category. Keep it up!")

        # Check if total score is less than 3
        if total_score < 3:
            print("You may consider doing more of the following:")
            
        if sleep_score < 3:
            print("get more sleep")
            
        if happy_score < 3:
            print("do something that makes you happy")
            
        if steps_score < 3:
            print("you should take a walk")
            """

#creating and storing a random dataset
import csv
import random
import pandas as pd

filename = 'random_WellBeingData.csv'
# Define the number of rows to generate
num_rows = int(input("how many rows do you want to generate"))

# Open the CSV 
with open(filename, 'w', newline='') as csvfile:
    fieldnames = ['steps', 'happiness', 'sleep']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()

    # Generate and write random data for each row
    for _ in range(num_rows):
        writer.writerow({
            'steps': random.randint(1, 20000),
            'happiness': random.randint(1, 10),
            'sleep': random.randint(1, 18)
        })

print(f"CSV dataset with {num_rows} rows now is generated")

df = pd.read_csv('random_WellBeingData.csv')

view = input("Do you want to preview it? (yes/no): ").lower()#
if view == 'yes':
    print(df)
    
df = pd.read_csv('random_WellBeingData.csv')
"""
"""
#validation of the random data set 

import csv

def validate_csv(file_path):
    with open(file_path, 'r') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:                         # function validates if sleep is less than 24 hours happyiness is less than 11 
            sleep = int(row['sleep'])              # and steps are less than 100,000
            happiness = int(row['happiness'])      # if the validation failed 
            
            if not (0 < sleep < 100000 and 0 < happiness < 11):
                return False, f"Validation failed for row with sleep: {sleep} and happiness: {happiness}"
    return True, "Validation successful"


file_path = 'random_WellBeingData.csv'
valid, message = validate_csv(file_path)
if valid:
    print(message)
else:
    print(message)

"""
##########################################
#Advanced requirement 2 
#Each ‘what if’ question must use a minimum of three validated parameters (using at least two
#different data types) and, based on the information provided, offer the user insights in relation 
#to some aspect of their wellbeing.
##########################################

###########
#question 1
#What if someone gets less than 5 hours of sleep and less than 5000 step and feels unhappy (rated less than 5)? What suggestions would the model give to improve their scores?
###########

###########
#question 2
#What if someone inputs a sleep duration of 10 hours, achieves more than 8000 steps, and rates their happiness as 9? What would be the total score and the model's feedback?
###########
"""


def calculate_scores(sleep, steps, happy):
    
    #Calculates sleep, happiness, and steps scores based on the input values.
    #Returns the individual scores and the total score.
    
    # Check if hours of sleep are more than 24
    if sleep > 24:
        return "Error: Invalid input for hours of sleep. Please enter a value less than or equal to 24."

    # Check if happiness level is within the valid range (1-10)
    if happy < 1 or happy > 10:
        return "Error: Invalid input for happiness level. Please enter a value between 1 and 10."

    # Calculate sleep score
    sleep_score = 0
    if sleep < 5:
        sleep_score += 1
    elif sleep < 7:
        sleep_score += 3
    elif sleep > 8:
        sleep_score += 5

    # Calculate happiness score
    happy_score = 0
    if happy < 5:
        happy_score += 1
    elif happy < 7:
        happy_score += 3
    elif happy > 8:
        happy_score += 5

    # Calculate steps score
    steps_score = 0
    if steps < 5000:
        steps_score += 1
    elif steps < 7000:
        steps_score += 3
    elif steps > 8000:
        steps_score += 5

    # Calculate total score
    total_score = sleep_score + happy_score + steps_score

    return sleep_score, happy_score, steps_score, total_score


def get_feedback(scores):

    #Provides feedback based on the scores.

    sleep_score, happy_score, steps_score, total_score = scores

    feedback = []

    # Check if all three scores are 5 and add "Well done" message
    if sleep_score == 5 and happy_score == 5 and steps_score == 5:
        feedback.append("Well done! You scored 5 in each category. Keep it up!")

    # Check if total score is less than 3
    if total_score < 3:
        feedback.append("You may consider doing more of the following:")
        if sleep_score < 3:
            feedback.append("Manage your sleep better.")
        if happy_score < 3:
            feedback.append("Do something you enjoy.")
        if steps_score < 3:
            feedback.append("Take a walk.")

    return feedback


# Test the model 

# Question 1
sleep_q1 = 4
steps_q1 = 4000
happy_q1 = 3
scores_q1 = calculate_scores(sleep_q1, steps_q1, happy_q1)
feedback_q1 = get_feedback(scores_q1)
print("Question 1 Feedback:")
if feedback_q1:
    for line in feedback_q1:
        print(line)
else:
    print("You should do something you enjoy, manage your sleep better, and take a walk.")

# Question 2
sleep_q2 = 10
steps_q2 = 9000
happy_q2 = 9
scores_q2 = calculate_scores(sleep_q2, steps_q2, happy_q2)
feedback_q2 = get_feedback(scores_q2)
print("\nQuestion 2 Feedback:")
if not feedback_q2:
    print("No specific feedback provided.")
else:
    for line in feedback_q2:
        print(line)
"""
##########################################
# Advanced Requirement 3
#Users can view data in a graphical format which displays information such as their progress 
#using the system or the results of a ‘what if’ scenario. 
##########################################


# this code shows a bar chart and pie chart of the random data set 

"""
import pandas as pd
import matplotlib.pyplot as plt

#rewriting my old code

def calculate_scores(sleep, steps, happy):
    
    # Check if hours of sleep are more than 24
    if sleep > 24:
        return "Error: Invalid input for hours of sleep. Please enter a value less than or equal to 24."

    # Check if happiness level is within the valid range (1-10)
    if happy < 1 or happy > 10:
        return "Error: Invalid input for happiness level. Please enter a value between 1 and 10."

    # Calculate sleep score
    sleep_score = 0
    if sleep < 5:
        sleep_score += 1
    elif sleep < 7:
        sleep_score += 3
    elif sleep > 8:
        sleep_score += 5

    # Calculate happiness score
    happy_score = 0
    if happy < 5:
        happy_score += 1
    elif happy < 7:
        happy_score += 3
    elif happy > 8:
        happy_score += 5

    # Calculate steps score
    steps_score = 0
    if steps < 5000:
        steps_score += 1
    elif steps < 7000:
        steps_score += 3
    elif steps > 8000:
        steps_score += 5

    # Calculate total score
    total_score = sleep_score + happy_score + steps_score

    return sleep_score, happy_score, steps_score, total_score

def get_feedback(scores):
    # Provides feedback based on the scores.
    sleep_score, happy_score, steps_score, total_score = scores
    feedback = []

    # Check if all three scores are 5 and add "Well done" message
    if sleep_score == 5 and happy_score == 5 and steps_score == 5:
        feedback.append("Well done! You scored 5 in each category. Keep it up!")

    # Check if total score is less than 3
    if total_score < 3:
        feedback.append("You may consider doing more of the following:")
        if sleep_score < 3:
            feedback.append("Manage your sleep better.")
        if happy_score < 3:
            feedback.append("Do something you enjoy.")
        if steps_score < 3:
            feedback.append("Take a walk.")

    return feedback

# Read the CSV file
data = pd.read_csv("random_WellBeingData.csv") # if it says "No such file or directory" modify this 

# Calculate scores for each entry
scores = []
for index, row in data.iterrows():
    sleep = row['sleep']
    steps = row['steps']
    happiness = row['happiness']
    scores.append(calculate_scores(sleep, steps, happiness))

# Extract individual scores
sleep_scores = sum([score[0] for score in scores])
happy_scores = sum([score[1] for score in scores])
steps_scores = sum([score[2] for score in scores])

print (":to view the pie chart please close the bar chart first")
#bar chart
fig, ax = plt.subplots(figsize=(10, 6))

bar_width = 0.25
index = range(3)

bar1 = ax.bar(index, [sleep_scores, happy_scores, steps_scores], bar_width)

ax.set_xlabel('Categories')
ax.set_ylabel('Total Scores')
ax.set_title('Total Scores for Each Category')
ax.set_xticks([i for i in index])
ax.set_xticklabels(['Sleep Score', 'Happiness Score', 'Steps Score'])

plt.tight_layout()
plt.show()


# Pie chart
labels = ['Sleep Score', 'Happiness Score', 'Steps Score']
sizes = [sleep_scores, happy_scores, steps_scores]

fig, ax = plt.subplots()
ax.pie(sizes, labels=labels, autopct='%1.1f%%', startangle=90)
ax.axis('equal') 

plt.title('Total Scores for Each Category (Pie Chart)')
plt.show()
"""