RegisterServerEvent('sendData')
AddEventHandler('sendData', function()
    local currentDate = os.date("*t")
    local daysOfWeek = { "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" }
    local months = { "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" }
    local dayOfWeek = daysOfWeek[currentDate.wday]
    local month = months[currentDate.month]
    local dateString = string.format("%s, %s %d", dayOfWeek, month, currentDate.day)
    TriggerClientEvent('receiveData', -1, dateString)
end)