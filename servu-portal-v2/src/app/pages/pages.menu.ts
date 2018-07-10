export const PAGES_MENU = [
    {
        path: 'pages',
        children: [
            {
                path: 'dashboard',
                data: {
                    menu: {
                        title: 'Dashboard',
                        icon: 'ion-android-home',
                        selected: false,
                        expanded: false,
                        order: 0
                    }
                }
            },
            {
                path: 'charts',
                data: {
                    menu: {
                        title: 'Chart',
                        icon: 'ion-stats-bars',
                        selected: false,
                        expanded: false,
                        order: 200,
                    }
                },
                children: [
                    {
                        path: 'chartist-js',
                        data: {
                            menu: {
                                title: 'chartist-js',
                            }
                        }
                    }
                ]
            },

            {
                path: 'today',
                data: {
                    menu: {
                        title: 'Today',
                        icon: 'fa fa-clock-o',
                        selected: false,
                        expanded: false,
                        order: 0
                    }
                }
            },
            {
                path: 'calender',
                data: {
                    menu: {
                        title: 'Calender',
                        icon: 'fa fa-calendar-o',
                        selected: false,
                        expanded: false,
                        order: 0
                    }
                }
            },
            {
                path: ['', 'pages', 'product', 'service'],
                data: {
                    menu: {
                        icon: 'fa fa-fax',
                        title: 'Services',
                    }
                }
            },
            {
                path: ['', 'pages', 'product', 'product'],
                data: {
                    menu: {
                        icon: 'fa fa-product-hunt',
                        title: 'Product',
                    }
                }
            },
            {
                path: ['', 'pages', 'product', 'classes'],
                data: {
                    menu: {
                        title: 'Classes',
                        icon: 'fa fa-graduation-cap',

                    }
                }
            },
            {
                path: 'provider',
                data: {
                    menu: {
                        title: 'Provider',
                        icon: 'fa fa-male',
                        selected: false,
                        expanded: false,
                        order: 0
                    }
                }
            },
            {
                path: 'customer',
                data: {
                    menu: {
                        title: 'Customer',
                        icon: 'fa fa-user',
                        selected: false,
                        expanded: false,
                        order: 0
                    }
                }
            },
            {
                path: ['', 'pages', 'membership'],
                data: {
                    menu: {
                        title: 'Membership',
                        icon: 'fa fa-google-wallet',
                        selected: false,
                        expanded: false,
                        order: 0
                    }
                }
            },
            // {
            //     path: 'staffschedule',
            //     data: {
            //         menu: {
            //             title: 'Staff Schedule',
            //             icon: 'fa fa-calendar-check-o',
            //             selected: false,
            //             expanded: false,
            //             order: 0
            //         }
            //     }
            // },
            {
                path: 'report',
                data: {
                    menu: {
                        title: 'Reports',
                        icon: 'fa fa-bar-chart-o',
                        selected: false,
                        expanded: false,
                        order: 0
                    }
                }
            },
            {
                path: 'setting',
                data: {
                    menu: {
                        title: 'Setting',
                        icon: 'fa fa-cogs',
                        selected: false,
                        expanded: false,
                        order: 100,
                    }
                },
                children: [
                    {
                        path: 'businessSetting',
                        data: {
                            menu: {
                                title: 'Business Setting',

                            }
                        }
                    },  {
                        path: 'branch',
                        data: {
                            menu: {
                                title: 'Branches',
                            }
                        }
                    },

                    // {
                    //     path: 'calendersetting',
                    //     data: {
                    //         menu: {
                    //             title: 'Calender Setting',
                    //         }
                    //     }
                    // },

                ],
            },
        ]
    }
];
