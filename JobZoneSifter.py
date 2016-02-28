__author__ = 'sadaf345'
from selenium import webdriver
import time
browser = webdriver.Chrome("C:\Python34\Scripts\selenium-2.51.1\py\selenium\webdriver\chrome\chromedriver")


def getCoop(jobType, season):
    """
    Opens the "Recommended Jobs" page and searches for jobs that match Co-op and the season term.
    After doing so, the id of the class of the job title is taken so that the location of the job
    can listed as well as the link to the job.
    Try-catch is used to avoid errors when acquiring jobs that are not qualified for the user.
    :param jobType: The type of job, Co-op in this instance
    :param season: The time of the year (Spring/Summer/Fall)
    :return: None
    """
    browser.get("https://rit-csm.symplicity.com/students/index.php?s=jobs&ss=jobmatches&mode=list&_ksl=1")
    jobTypeSearch = browser.find_elements_by_xpath("//*[contains(text(), '" + jobType + "')]")
    seasonSearch = browser.find_elements_by_xpath("//*[contains(text(), '" + season + "')]")
    jobLink = "https://rit-csm.symplicity.com/students/index.php"

    for job in jobTypeSearch and seasonSearch:
        locationElement = job.get_attribute("outerHTML")
        if (locationElement[1:4] != 'div'): # Removes anything found that just lists "Co-op" as it messes with the system
            elemID = locationElement[27:59]
            try:
                qualifiedVerification = job.find_element_by_xpath('//*[@id="row_' + elemID + '"]/div[2]/div[1]/span')
                if qualifiedVerification.text[0:13] != 'Not qualified':
                    locationText = job.find_element_by_xpath('//*[@id="row_' + elemID + '"]/div[2]/div[3]')
                    endingURL = locationElement[9:88]
                    jobLink = jobLink + endingURL
                    print(job.text + " for " + locationText.text.partition("-")[0] + "in" + locationText.text.partition("-")[2])
                    print("Link: " + jobLink)
                    print("\n")
            except Exception:
                locationText = job.find_element_by_xpath('//*[@id="row_' + elemID + '"]/div[2]/div[3]')
                endingURL = locationElement[9:88]
                jobLink = jobLink + endingURL
                print(job.text + " for " + locationText.text.partition("-")[0] + "in" + locationText.text.partition("-")[2])
                print("Link: " + jobLink)
                print("\n")

def getFulltime(jobType):
    """
    Opens the "Recommended Jobs" page and searches for jobs that match Fulltime.
    After doing so, the id of the class of the job title is taken so that the location of the job
    can listed as well as the link to the job.
    Try-catch is used to avoid errors when acquiring jobs that are not qualified for the user.
    :param jobType: The type of job, Fulltime in this instance
    :return: None
    """
    browser.get("https://rit-csm.symplicity.com/students/index.php?s=jobs&ss=jobmatches&mode=list&_ksl=1")
    jobLink = "https://rit-csm.symplicity.com/students/index.php"
    jobTypeSearch = browser.find_elements_by_xpath("//*[contains(text(), '" + jobType + "')]")

    for job in jobTypeSearch:
        locationElement = job.get_attribute("outerHTML")
        if (locationElement[1:4] != 'div'):
            elemID = locationElement[27:59]
            try:
                qualifiedVerification = job.find_element_by_xpath('//*[@id="row_' + elemID + '"]/div[2]/div[1]/span')
                if qualifiedVerification.text[0:13] != 'Not qualified':
                    locationText = job.find_element_by_xpath('//*[@id="row_' + elemID + '"]/div[2]/div[3]')
                    endingURL = locationElement[9:88]
                    jobLink = jobLink + endingURL
                    print(job.text + " for " + locationText.text.partition("-")[0] + "in" + locationText.text.partition("-")[2])
                    print("Link: " + jobLink)
                    print("\n")
            except Exception:
                locationText = job.find_element_by_xpath('//*[@id="row_' + elemID + '"]/div[2]/div[3]')
                endingURL = locationElement[9:88]
                jobLink = jobLink + endingURL
                print(job.text + " for " + locationText.text.partition("-")[0] + "in" + locationText.text.partition("-")[2])
                print("Link: " + jobLink)
                print("\n")


def cls():
    """
    Clears console screen because I haven't figured a proper solution to hiding password input :/
    :return: None
    """
    print("\n" * 10)

def login():
    # Logs into RIT JobZone

    """
    Takes username and password input and requests job type and what part of the
    year for co-ops. Opens up chrome and goes to login for JobZone and finds
    the username and password textboxes and enters the input strings respectfully.
    Clicks the login button and chooses the function that matches the job type

    :return: None
    """
    username = input("Enter your username: ")
    password = input("Enter your password: ")
    cls()
    seasonTerm = ''
    jobType = input("Are you searching for co-op for Fulltime? ")
    if jobType == 'Co-op' or jobType == 'co-op':
        seasonTerm = input("What part of the season are you looking? (Spring/Summer/Fall): ")
    cls()
    browser.get("https://shibboleth-rit-csm.symplicity.com/sso/")

    user = browser.find_element_by_id("ccid")
    passw = browser.find_element_by_id("password")

    user.send_keys(username)
    passw.send_keys(password)

    enterBtn = browser.find_element_by_name("submit")
    enterBtn.click()

    if jobType == 'Co-op' or 'co-op':
        getCoop(jobType, seasonTerm)
    elif jobType == 'Fulltime' or 'fulltime':
        getFulltime(jobType)
    else:
        print("Invalid Search queries..")

    time.sleep(10)
def main():
    """
    Runs the entire script
    :return: None
    """
    print("Let's see where I can apply today!")
    login()
main()
