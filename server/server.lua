RegisterServerEvent('sendDateTimeToClient')
AddEventHandler('sendDateTimeToClient', function(source)
    local currentDate = os.date("*t")
    local daysOfWeek = {"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"}
    local months = {"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"}
    local dayOfWeek = daysOfWeek[currentDate.wday]
    local month = months[currentDate.month]
    local dateString = string.format("%s, %s %d", dayOfWeek, month, currentDate.day)
    TriggerClientEvent('receiveDateTime', -1, dateString)  -- Send date/time to all clients
end)