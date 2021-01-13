# Soccer Logger

The code in this repository implements **Event Tagging Interface**, a web application which allows a user to define temporal window of events from soccer video broadcasts. Events which can be chosen are: **Pass**, **Shot** and **Goal**.
The image below shows how is the mainly UI of the interface.

![EventTaggingInterface](/Scheme/manual_annotation_application.png)  

a) The dropdown element allows to select which match you want to tag.  
b) The player shows the video of the match. The buttons under the video allows to play/pause the video, go to previous frame, go to next frame, define the start time and the end time of the selected event.
c) The table shows all the events that has already been annotated. To create an event use the 'Add Event' button. The rows are clickable and set the video at the start time of the event. In addition when you set the time window you can save the data inside the specific csv by clicking the button 'Update CSV'.
All the buttons on the interface are usable from the keyboard or from a common joypad.

## Run the interface

Before launching the interface it is necessary to insert the videos in mp4 format inside the static folder.

To run the interface you need to run the requirements.txt file that contains all the dependencies required, especially the flask library. As a first step to start the interface you must first open a bash in order to launch the following script:  
```python events_tagging_dashboard.py```  
Once launched, on your shell you should have a success message such as the following:
![bash](/Scheme/bash.jpg)  
Now, you can access the interface from a browser, by accessing the following url: ```http://127.0.0.1:5000```
Once the matches are annotated, a csv file with the annotation is saved in the path Event Tagging Interface/Data.


