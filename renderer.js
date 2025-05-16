// Navigation
document.querySelectorAll('[data-page]').forEach(element => {
    element.addEventListener('click', (e) => {
        e.preventDefault();
        const pageId = element.getAttribute('data-page');
        navigateToPage(pageId);
    });
});

function navigateToPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // Show selected page
    const selectedPage = document.getElementById(`${pageId}-page`);
    if (selectedPage) {
        selectedPage.classList.add('active');
    }

    // Update navigation active state
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageId) {
            link.classList.add('active');
        }
    });
}

// Form Submissions
document.getElementById('create-group-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = {
        name: document.getElementById('group-name').value,
        contributionAmount: document.getElementById('contribution-amount').value,
        maxMembers: document.getElementById('max-members').value,
        contributionFrequency: document.getElementById('contribution-frequency').value,
        description: document.getElementById('description').value,
        rules: document.getElementById('rules').value
    };
    
    // TODO: Send to main process
    console.log('Create group:', formData);
    navigateToPage('my-groups');
});

document.getElementById('login-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = {
        email: document.getElementById('login-email').value,
        password: document.getElementById('login-password').value
    };
    
    // TODO: Send to main process
    console.log('Login:', formData);
    navigateToPage('my-groups');
});

document.getElementById('register-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = {
        name: document.getElementById('register-name').value,
        email: document.getElementById('register-email').value,
        password: document.getElementById('register-password').value,
        confirmPassword: document.getElementById('register-confirm-password').value
    };
    
    if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    // TODO: Send to main process
    console.log('Register:', formData);
    navigateToPage('my-groups');
});

// Sample data for demonstration
const sampleGroups = [
    {
        id: 1,
        name: 'Weekly Savers',
        status: 'active',
        contributionAmount: 100,
        contributionFrequency: 'weekly',
        currentMembers: 5,
        maxMembers: 10,
        nextPayout: true,
        nextPayoutDate: '2024-03-27',
        nextPayoutMember: 'John Doe',
        progress: 50,
        members: [
            { id: 1, name: 'John Doe', status: 'active', nextPayout: '2024-03-27' },
            { id: 2, name: 'Jane Smith', status: 'active', nextPayout: '2024-04-03' },
            { id: 3, name: 'Mike Johnson', status: 'active', nextPayout: '2024-04-10' },
            { id: 4, name: 'Sarah Williams', status: 'active', nextPayout: '2024-04-17' },
            { id: 5, name: 'David Brown', status: 'active', nextPayout: '2024-04-24' }
        ],
        contributions: [
            { date: '2024-03-20', member: 'John Doe', amount: 100, status: 'completed' },
            { date: '2024-03-20', member: 'Jane Smith', amount: 100, status: 'completed' },
            { date: '2024-03-20', member: 'Mike Johnson', amount: 100, status: 'completed' },
            { date: '2024-03-20', member: 'Sarah Williams', amount: 100, status: 'completed' },
            { date: '2024-03-20', member: 'David Brown', amount: 100, status: 'pending' }
        ]
    },
    {
        id: 2,
        name: 'Monthly Investment',
        status: 'pending',
        contributionAmount: 500,
        contributionFrequency: 'monthly',
        currentMembers: 3,
        maxMembers: 8,
        nextPayout: false,
        progress: 25
    }
];

// Render sample groups
function renderGroups(groups) {
    const groupsList = document.getElementById('groups-list');
    if (!groupsList) return;

    groupsList.innerHTML = groups.map(group => `
        <div class="col-md-6 col-lg-4 mb-4">
            <div class="card h-100">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h5 class="card-title mb-0">${group.name}</h5>
                    <span class="badge ${group.status === 'active' ? 'bg-success' : 'bg-warning'}">
                        ${group.status.charAt(0).toUpperCase() + group.status.slice(1)}
                    </span>
                </div>
                <div class="card-body">
                    <div class="mb-3">
                        <h6 class="text-muted">Contribution Details</h6>
                        <p class="mb-1">
                            <i class="bi bi-currency-dollar"></i> ${group.contributionAmount} per ${group.contributionFrequency}
                        </p>
                        <p class="mb-1">
                            <i class="bi bi-people"></i> ${group.currentMembers}/${group.maxMembers} members
                        </p>
                    </div>
                    
                    ${group.nextPayout ? `
                    <div class="mb-3">
                        <h6 class="text-muted">Next Payout</h6>
                        <p class="mb-1">
                            <i class="bi bi-calendar-event"></i> ${group.nextPayoutDate}
                        </p>
                        <p class="mb-1">
                            <i class="bi bi-person"></i> ${group.nextPayoutMember}
                        </p>
                    </div>
                    ` : ''}

                    <div class="progress mb-3">
                        <div class="progress-bar" role="progressbar" style="width: ${group.progress}%">
                            ${group.progress}%
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="d-grid gap-2">
                        <button class="btn btn-outline-primary" onclick="viewGroupDetails(${group.id})">
                            <i class="bi bi-eye me-2"></i>View Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// View group details
function viewGroupDetails(groupId) {
    const group = sampleGroups.find(g => g.id === groupId);
    if (!group) return;

    // Update group details
    document.getElementById('group-details-name').textContent = group.name;
    document.getElementById('group-contribution-amount').textContent = `$${group.contributionAmount}`;
    document.getElementById('group-contribution-frequency').textContent = group.contributionFrequency;
    document.getElementById('group-members-count').textContent = group.currentMembers;
    document.getElementById('group-max-members').textContent = group.maxMembers;
    document.getElementById('group-next-payout-date').textContent = group.nextPayoutDate;
    document.getElementById('group-next-payout-member').textContent = group.nextPayoutMember;

    // Render members list
    const membersList = document.getElementById('members-list');
    membersList.innerHTML = group.members.map(member => `
        <tr>
            <td>${member.name}</td>
            <td>
                <span class="badge ${member.status === 'active' ? 'bg-success' : 'bg-warning'}">
                    ${member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                </span>
            </td>
            <td>${member.nextPayout}</td>
            <td>
                <button class="btn btn-sm btn-outline-primary me-1" onclick="viewMemberDetails(${member.id})">
                    <i class="bi bi-eye"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger" onclick="removeMember(${member.id})">
                    <i class="bi bi-person-x"></i>
                </button>
            </td>
        </tr>
    `).join('');

    // Render contributions list
    const contributionsList = document.getElementById('contributions-list');
    contributionsList.innerHTML = group.contributions.map(contribution => `
        <tr>
            <td>${contribution.date}</td>
            <td>${contribution.member}</td>
            <td>$${contribution.amount}</td>
            <td>
                <span class="badge ${contribution.status === 'completed' ? 'bg-success' : 'bg-warning'}">
                    ${contribution.status.charAt(0).toUpperCase() + contribution.status.slice(1)}
                </span>
            </td>
        </tr>
    `).join('');

    // Navigate to group details page
    navigateToPage('group-details');
}

// Member management functions
function viewMemberDetails(memberId) {
    // TODO: Implement member details view
    console.log('View member:', memberId);
}

function removeMember(memberId) {
    if (confirm('Are you sure you want to remove this member?')) {
        // TODO: Implement member removal
        console.log('Remove member:', memberId);
    }
}

// Add event listeners for new buttons
document.getElementById('edit-group-btn')?.addEventListener('click', () => {
    // TODO: Implement group editing
    console.log('Edit group');
});

document.getElementById('leave-group-btn')?.addEventListener('click', () => {
    if (confirm('Are you sure you want to leave this group?')) {
        // TODO: Implement group leaving
        console.log('Leave group');
        navigateToPage('my-groups');
    }
});

document.getElementById('invite-member-btn')?.addEventListener('click', () => {
    // TODO: Implement member invitation
    console.log('Invite member');
});

// Initialize groups list
renderGroups(sampleGroups); 