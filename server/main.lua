if Config.Framework == "qb-core" then
    QBCore = exports['Core']:GetCoreObject()
elseif Config.Framework == "esx" then
    ESX = exports.es_extended:getSharedObject()
end

local DAYS = { "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" }
local MONTHS = { "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" }

local function getFormattedDate()
    local currentDate = os.date("*t")
    local day = DAYS[currentDate.wday]
    local month = MONTHS[currentDate.month]
    return string.format("%s, %s %d", day, month, currentDate.day)
end

RegisterServerEvent('sendData')
AddEventHandler('sendData', function()
    local dateString = getFormattedDate()
    TriggerClientEvent('receiveData', -1, dateString)
end)

lib.callback.register('devx_spawn:server:getHouses', function(source)
    if Config.Framework == "qb-core" then
        player = QBCore.Functions.GetPlayer(source)
    elseif Config.Framework == "esx" then
        player = ESX.GetPlayerFromId(source)
    end
    local houseData = {}
    local playerHouses = MySQL.query.await('SELECT house FROM player_houses WHERE citizenid = ?', {player.PlayerData.citizenid})
    for i = 1, #playerHouses do
        local name = playerHouses[i].house
        local locationData = MySQL.single.await('SELECT `coords`, `label` FROM houselocations WHERE name = ?', {name})
        houseData[#houseData+1] = {
            label = locationData.label,
            coords = json.decode(locationData.coords).enter
        }
    end

    return houseData
end)